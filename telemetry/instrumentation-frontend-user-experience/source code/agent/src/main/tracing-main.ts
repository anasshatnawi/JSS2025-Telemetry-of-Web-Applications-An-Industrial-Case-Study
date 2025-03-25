// Importations
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { defaultResource, resourceFromAttributes } from '@opentelemetry/resources';
import { BatchSpanProcessor, WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import "core-js/stable";
import "regenerator-runtime/runtime";
import config from '../config/config.template';
import { UserIdentitySpanProcessor } from '../utils/userUtils';

// Configuration entries
const serviceName = config.service.name;
const serviceVersion = config.service.version;
const collectorEndpoint = config.collectorEndpoint;
const eventNames = Object.entries(config.enabledEvents)
    .filter(([_, enabled]) => enabled)
    .map(([event]) => event as keyof HTMLElementEventMap);

// Resource descriptions
const resource = defaultResource().merge(
    resourceFromAttributes({
        [ATTR_SERVICE_NAME]: serviceName,
        [ATTR_SERVICE_VERSION]: serviceVersion,
    }),
);

// Exporters
const otlpExporter = new OTLPTraceExporter({
    // Default endpoint for the OTLP HTTP collector. Adjust if needed.
    url: collectorEndpoint,
});

// Processors
const processor = new UserIdentitySpanProcessor(new BatchSpanProcessor(otlpExporter));

// Provider
export const provider = new WebTracerProvider({
    resource: resource,
    spanProcessors: [processor]
});

// Context Registration
provider.register({
    contextManager: new ZoneContextManager(),
    propagator: new W3CTraceContextPropagator()
});

// Instrumentation Registration
registerInstrumentations({
    instrumentations: [
        getWebAutoInstrumentations({
            '@opentelemetry/instrumentation-document-load': {
                enabled: false
            }, '@opentelemetry/instrumentation-fetch': {
                enabled: false
            }, '@opentelemetry/instrumentation-xml-http-request': {
                enabled: false
            }, '@opentelemetry/instrumentation-user-interaction': {
                eventNames
            },
        }),
    ],
    tracerProvider: provider
});