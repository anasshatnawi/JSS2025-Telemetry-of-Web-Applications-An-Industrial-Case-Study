# OpenTelemetry Endpoint Agent for Backend Applications
This agent is designed to automatically instrument backend applications built with Spring Boot by creating a span for every execution of an endpoint (i.e. non-constructor public methods in classes annotated with `@Service`). Each generated span includes important contextual attributes such as:

- `method`: The signature of the invoked method.
- `class`: The fully qualified name of the class containing the method.
- `arguments`: A serialized array of the method arguments.
- `result`: A serialized representation of the method’s return value.

---

## ✨ Features
- **🔍 Automatic Endpoint Instrumentation:**  
  Automatically creates spans for all non-constructor public methods in Spring `@Service` classes.
- **💬 Detailed Span Attributes:**  
  Captures method signatures, class names, arguments, and return values for comprehensive trace details.
- **🚀 Seamless Integration:**  
  Designed to work as an extension with existing OpenTelemetry Java agents.
- **⚙️ Configurable & Lightweight:**  
  Easily enable/disable the extension and configure output (e.g., exporting to Zipkin) via JVM arguments.

---

## 📁 Project Structure
```plaintext
backend-agent/
├── build.gradle             # Gradle build configuration
├── gradlew                  # Gradle wrapper (Unix)
├── gradlew.bat              # Gradle wrapper (Windows)
├── settings.gradle          # Gradle settings
├── src/
│   └── main/
│       └── java/           # Java source files for the agent extension
│           └── ...         # (e.g., endpoint instrumentation classes)
├── prebuilt/                # Contains prebuilt JARs (after a build)
└── README.md                # This file
```

---

## 🔨 Building the Agent
To build the agent extension along with its prebuilt artifacts, run:

```sh
./gradlew buildAll
```

After a successful build, you will find:
- `telemetry-agent-1.0-all.jar` – The extension JAR with all dependencies.
- `opentelemetry-javaagent.jar` – The full agent JAR including this extension.

Both artifacts are copied to the `prebuilt/` folder.

---

## ⚙️ Configuration & Usage
### Usage in Your Application
#### **Option 1: Directly Attach the Agent**
Add the agent JAR to your JVM startup arguments:

```bash
-javaagent:Path/To/opentelemetry-javaagent.jar
```

#### **Option 2: Use an Existing OpenTelemetry Java Agent and Include the Extension**
If you already have an OpenTelemetry Java agent, include the extension via:

```bash
-javaagent:Path/To/opentelemetry-javaagent.jar \
-Dotel.javaagent.extensions=Path/To/opentelemetry-endpoints-1.0-all.jar
```

To enable only this extension, add the following JVM arguments:

```bash
-Dotel.metrics.exporter=none
-Dotel.instrumentation.common.default-enabled=false
-Dotel.instrumentation.endpoints.enabled=true
```

#### **Complete Example (Exporting to Zipkin):**
```bash
-javaagent:Path/To/opentelemetry-javaagent.jar \
-Dotel.javaagent.extensions=Path/To/opentelemetry-endpoints-1.0-all.jar \
-Dotel.traces.exporter=zipkin \
-Dotel.metrics.exporter=none \
-Dotel.instrumentation.common.default-enabled=false \
-Dotel.instrumentation.endpoints.enabled=true
```

*Tip: Adjust the `Path/To/` parts to the actual locations of your JAR files.*

### Running Your Application
Once the agent is attached via the JVM arguments, launch your Spring Boot application normally (e.g., using `java -jar ...`). The agent will initialize automatically, instrumenting your endpoints and exporting traces to your configured telemetry backend.

---

## 📄 License
This project is licensed under the ISC License. See the [LICENSE](./LICENSE) file for details.