package fr.drit.javaagent.endpoints.helpers;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.json.JettisonMappedXmlDriver;
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.instrumentation.api.instrumenter.Instrumenter;
import io.opentelemetry.instrumentation.api.instrumenter.SpanKindExtractor;

/**
 * Helper class loaded alongside the instrumented code. This is useful to make constants available
 * to advice code through static methods.
 */
public class EndPointInstrumentationSingletons {

  private static final String INSTRUMENTATION_NAME = "fr.drit.javaagent.endpoints-1.0";

  private static final Instrumenter<String, Void> INSTRUMENTER;
  private static final XStream XSTREAM_MAPPER;

  static {
    INSTRUMENTER =
        Instrumenter.<String, Void>builder(
                GlobalOpenTelemetry.get(), INSTRUMENTATION_NAME, (String request) -> request)
            .newInstrumenter(SpanKindExtractor.alwaysServer());

    XSTREAM_MAPPER = new XStream(new JettisonMappedXmlDriver());
  }

  public static Instrumenter<String, Void> instrumenter() {
    return INSTRUMENTER;
  }

  public static XStream mapper() {
    return XSTREAM_MAPPER;
  }

  private EndPointInstrumentationSingletons() {}
}
