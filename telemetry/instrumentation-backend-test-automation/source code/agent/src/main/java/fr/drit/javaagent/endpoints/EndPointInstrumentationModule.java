package fr.drit.javaagent.endpoints;

import static java.util.Collections.singletonList;

import com.google.auto.service.AutoService;
import io.opentelemetry.javaagent.extension.instrumentation.InstrumentationModule;
import io.opentelemetry.javaagent.extension.instrumentation.TypeInstrumentation;
import java.util.List;

@AutoService(InstrumentationModule.class)
public class EndPointInstrumentationModule extends InstrumentationModule {

  public EndPointInstrumentationModule() {
    super("endpoints", "endpoints-1.0");
  }

  @Override
  public boolean isHelperClass(String className) {
    return className.startsWith("fr.drit.javaagent.endpoints.helpers.");
  }

  @Override
  public List<TypeInstrumentation> typeInstrumentations() {
    return singletonList(new EndPointTypeInstrumentation());
  }
}
