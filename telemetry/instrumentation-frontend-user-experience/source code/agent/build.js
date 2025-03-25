// build.js
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env (Node side)
dotenv.config();

// Optionally, read config.json from the project root:
const configPath = path.resolve(__dirname, 'config.json');
let userConfig = {};
if (fs.existsSync(configPath)) {
  userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// Merge with defaults from your config module (compiled)
const defaultConfig = require('./dist/config/config.template').default;
// Here, userConfig overrides defaults if available
const finalConfig = Object.assign({}, defaultConfig, userConfig);

const appName = finalConfig.service.name;
const currentTimestamp = new Date().toISOString().replace(/[:.]/g, '-');

esbuild.build({
  entryPoints: [path.resolve(__dirname, 'src', 'index.ts')],
  bundle: true,
  minify: true,
  platform: 'browser',
  target: ['es2017'],
  outfile: path.resolve(__dirname, 'assets', 'bundles', appName, `${appName}-${currentTimestamp}.js`),
  loader: { '.ts': 'ts' },
  define: {
    'process.env.OTLP_HTTP_TRACES_ENDPOINT': JSON.stringify(finalConfig.collectorEndpoint),
    'process.env.SERVICE_NAME': JSON.stringify(finalConfig.service.name),
    'process.env.SERVICE_VERSION': JSON.stringify(finalConfig.service.version),
    'process.env.ENABLED_EVENTS': JSON.stringify(finalConfig.enabledEvents)
  },
}).catch(() => process.exit(1));
