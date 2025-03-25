import * as fs from 'fs';
import inquirer from "inquirer";
import * as path from 'path';
import config from '../config/config.template';

const questions = ([
    {
        type: 'input',
        name: 'serviceName',
        message: 'Enter the service (application) name:',
        default: config.service.name,
    },
    {
        type: 'input',
        name: 'serviceVersion',
        message: 'Enter the service version:',
        default: config.service.version,
    },
    {
        type: 'input',
        name: 'collectorEndpoint',
        message: 'Enter the OTLP HTTP Traces Collector endpoint URL:',
        default: config.collectorEndpoint,
    },
    {
        type: 'checkbox',
        name: 'enabledEvents',
        message: 'Select the user interaction events to capture:',
        choices: Object.keys(config.enabledEvents),
        default: Object.keys(config.enabledEvents).filter(
            (event) => config.enabledEvents[event]
        )
    }
] as any);

inquirer.prompt(questions).then((answers) => {
    // Convert the checkbox result back into an object mapping event names to booleans.
    const events: { [key: string]: boolean } = {};
    for (const key of Object.keys(config.enabledEvents)) {
        events[key] = answers.enabledEvents.includes(key);
    }

    const finalConfig = {
        service: {
            name: answers.serviceName,
            version: answers.serviceVersion,
        },
        otlpEndpoint: answers.otlpEndpoint,
        enabledEvents: events,
    };

    const configPath = path.resolve(__dirname, '../../config.json');
    fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 2));
    console.log(`Agent Configuration CLI: Configuration saved to ${configPath}`);
});