export interface AgentConfiguration {
    service: {
        name: string;
        version: string;
    };
    collectorEndpoint: string;
    enabledEvents: { [key: string]: boolean };
}

// This function only reads from process.env and falls back to defaults.
export function getAgentConfig(): AgentConfiguration {
    // For enabledEvents, assume it’s a JSON string injected by the build tool.
    let enabledEvents: { [key: string]: boolean } = {};
    const defaultEvents = {
        "click": true,
        "change": true,
        "select": true,
        "submit": true,
        "scroll": true,
        "scrollend": true,
        "drag": true,
        "dragend": true,
        "dragenter": true,
        "dragleave": true,
        "dragover": true,
        "dragstart": true,
        "drop": true,
        "focus": true,
        "focusin": true,
        "focusout": true
    };

    const enabledEventsEnv = process.env.ENABLED_EVENTS;
    if (typeof enabledEventsEnv === 'string') {
        // If it's a string (from a .env file), split it into an object.
        enabledEvents = enabledEventsEnv.split(',').reduce((acc, event) => {
            acc[event.trim()] = true;
            return acc;
        }, {} as { [key: string]: boolean });
    } else if (typeof enabledEventsEnv === 'object' && enabledEventsEnv !== null) {
        // If it's already an object (e.g. coming from config.json or injected via DefinePlugin), use it directly.
        enabledEvents = enabledEventsEnv as { [key: string]: boolean };
    } else
        enabledEvents = defaultEvents;

    return {
        service: {
            name: process.env.SERVICE_NAME || "unknown",
            version: process.env.SERVICE_VERSION || "unknown",
        },
        collectorEndpoint: process.env.OTLP_HTTP_TRACES_ENDPOINT || "http://localhost:4318/v1/traces",
        enabledEvents,
    };
}

export default getAgentConfig();
