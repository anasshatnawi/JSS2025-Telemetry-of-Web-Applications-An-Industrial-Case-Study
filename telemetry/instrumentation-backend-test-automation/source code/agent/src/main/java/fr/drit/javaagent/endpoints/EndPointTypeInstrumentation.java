package fr.drit.javaagent.endpoints;

import static fr.drit.javaagent.endpoints.helpers.EndPointInstrumentationSingletons.instrumenter;
import static fr.drit.javaagent.endpoints.helpers.EndPointInstrumentationSingletons.mapper;
import static net.bytebuddy.matcher.ElementMatchers.annotationType;
import static net.bytebuddy.matcher.ElementMatchers.hasAnnotation;
import static net.bytebuddy.matcher.ElementMatchers.isConstructor;
import static net.bytebuddy.matcher.ElementMatchers.isPublic;
import static net.bytebuddy.matcher.ElementMatchers.isStatic;
import static net.bytebuddy.matcher.ElementMatchers.namedOneOf;
import static net.bytebuddy.matcher.ElementMatchers.not;

import io.opentelemetry.api.trace.Span;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.Scope;
import io.opentelemetry.javaagent.extension.instrumentation.TypeInstrumentation;
import io.opentelemetry.javaagent.extension.instrumentation.TypeTransformer;
import io.opentelemetry.javaagent.instrumentation.api.Java8BytecodeBridge;
import net.bytebuddy.asm.Advice;
import net.bytebuddy.description.type.TypeDescription;
import net.bytebuddy.implementation.bytecode.assign.Assigner;
import net.bytebuddy.matcher.ElementMatcher;

public class EndPointTypeInstrumentation implements TypeInstrumentation {

  @Override
  public ElementMatcher<TypeDescription> typeMatcher() {
    return hasAnnotation(
        annotationType(
            namedOneOf(
                // Spring
                "org.springframework.stereotype.Service",
                "org.springframework.stereotype.Controller",
                "org.springframework.web.bind.annotation.RestController",
                // Jakarta 9+
                "jakarta.ws.rs.Path",
                "jakarta.ws.rs.ApplicationPath",
                // Jakarta <9
                "javax.ws.rs.Path",
                "javax.ws.rs.ApplicationPath")));
  }

  @Override
  public void transform(TypeTransformer transformer) {
    transformer.applyAdviceToMethod(
        isPublic().and(not(isConstructor().or(isStatic()))),
        this.getClass().getName() + "$MethodAdvice");
  }

  @SuppressWarnings("unused")
  public static class MethodAdvice {

    @Advice.OnMethodEnter(suppress = Throwable.class)
    public static void onEnter(
        @Advice.Origin("#t") Class<?> declaringClass,
        @Advice.Origin("#m") String methodName,
        @Advice.Origin("#s") String methodSignature,
        @Advice.AllArguments(typing = Assigner.Typing.DYNAMIC) Object[] arguments,
        @Advice.Local("otelContext") Context context,
        @Advice.Local("otelScope") Scope scope,
        @Advice.Local("otelRequest") String request) {
      Context parentContext = Java8BytecodeBridge.currentContext();
      String signature = methodName + methodSignature;
      String className = declaringClass.getName();
      request = className + "#" + signature;

      if (!instrumenter().shouldStart(parentContext, request)) {
        return;
      }

      context = instrumenter().start(parentContext, request);
      scope = context.makeCurrent();
      Span span = Java8BytecodeBridge.currentSpan();

      // put the class name and method signature in the span
      span.setAttribute("class", className).setAttribute("method", signature);

      // put the serialized arguments in the span
      span.setAttribute("arguments", mapper().toXML(arguments));
    }

    @Advice.OnMethodExit(onThrowable = Throwable.class, suppress = Throwable.class)
    public static void onExit(
        @Advice.Return(typing = Assigner.Typing.DYNAMIC) Object result,
        @Advice.Local("otelContext") Context context,
        @Advice.Local("otelScope") Scope scope,
        @Advice.Local("otelRequest") String request) {
      if (scope == null) {
        return;
      }

      Span span = Java8BytecodeBridge.currentSpan();

      // put the serialized result in the span
      span.setAttribute("result", mapper().toXML(result));

      scope.close();
      instrumenter().end(context, request, null, null);
    }
  }
}
