# Web OpenTelemetry Agent for Frontend Applications
This project provides an **OpenTelemetry TypeScript instrumentation agent** designed to capture user interaction events in web frontend applications. The agent is bundled using a custom build script (based on esbuild) and can be integrated into your web application to generate distributed traces from user interactions (e.g., clicks, form submissions, scrolling, focus events, drag & drop, etc.).

---

## ✨ Features
- **💻 User Interaction Tracing:** Automatically captures events such as click, submit, change, select, scroll, scrollend, drag & drop, and more.
- **🔧 Custom Span Processing:** Attaches custom attributes (e.g., user ID, session ID, visit ID) to every span.
- **🚀 OTLP Export:** Exports traces to an OpenTelemetry Collector via HTTP.
- **⚙️ Dynamic Configuration:**  
  - **CLI/Config File:** Use the CLI to generate or update a `config.json` file at the project root.  
  - **.env File:** Alternatively, configure via a `.env` file.  
  The build process injects these values into the bundle.
- **⚡ Fast Build Process:** Bundled with **esbuild** for rapid builds.

---

## 📁 Project Structure
```
agent/
├── src/
│   ├── api/
│   │   └── cli.ts                  # CLI script to generate/update config.json
│   ├── config/
│   │   └── config.template.ts      # Configuration module; reads from process.env and/or config.json
│   ├── main/
│   │   └── tracing-main.ts         # Sets up tracing and registers instrumentations
│   ├── utils/
│   │   └── userUtils.ts            # Utility functions for user identity processing
│   └── index.ts                    # Main entry that initializes the agent
├── build.js                        # esbuild script for bundling the agent
├── package.json                    # Project metadata and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

---

## 🚀 Installation
1. **Install Dependencies:**
   ```sh
   npm install
   ```

---

## 🔨 Building the Agent
The build process involves:
- **Cleaning:** Deleting previous build output.
- **Compiling:** Running `tsc` to compile TypeScript files into the `dist/` directory.
- **Bundling:** Executing `node build.js` (using esbuild) to generate a minified bundle.  
  The final bundle is placed in `assets/bundles/<service-name>/` with a timestamped filename.

To build the agent, run:

```sh
npm run build
```

---

## ⚙️ Configuration
You have **two options** for configuring the agent. The build process injects these configuration values into the bundle via esbuild’s `define` option.

### Option 1: Using a `config.json` File
- **Purpose:**  
  Dynamically customize parameters (service name, version, collector endpoint, enabled events) using a CLI.
- **Usage:**  
  Run the following command to launch the CLI:
  ```sh
  npm run configure
  ```
  Answer the prompts and a `config.json` file will be created/updated at the project root. During the build, these values override the defaults.

### Option 2: Using a `.env` File
- **Purpose:**  
  Provide configuration values using environment variables.
- **Setup:**  
  Create a `.env` file at the project root with content like:
  ```dotenv
  SERVICE_NAME=posts-users-ui-ng
  SERVICE_VERSION=2.0.0
  OTLP_HTTP_TRACES_ENDPOINT=http://localhost:4318/v1/traces
  ENABLED_EVENTS=click,change,select,submit,scroll,scrollend,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,focus,focusin,focusout
  ```
  The configuration module (`src/config/config.template.ts`) reads from `process.env` and falls back to defaults if the variables are not provided.

*Note:* You can use either approach—**CLI/config.json** for dynamic control or **.env** for a simpler, fixed configuration. The build process injects the values accordingly.

---

## 📦 Usage
To integrate the agent with your web application, include the generated bundle in your HTML. For example:

```html
<script src="path/to/agent-bundle.js"></script>
```

Once loaded, the agent automatically initializes, captures user interaction events, and exports traces to your configured OTLP Collector.

---

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for details.