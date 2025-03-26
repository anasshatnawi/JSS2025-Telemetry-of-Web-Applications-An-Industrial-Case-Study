# Replication Package – React Frontend & Spring Boot Backend  
This folder contains the replication artifacts for the **React/Spring Boot** configuration used in our study *Telemetry of Web Applications: An Industrial Case Study*. For common instructions (global tools, telemetry backend, instrumentation agent integration, etc.), please refer to the [global README](../README.md) in the repository root.

---

## 📂 Package Contents  
- `jpetstore-backend-spring-boot/` – Spring Boot backend application (PetStore API)  
- `petstore-frontend-react/` – React frontend application (built with React and Vite)  
- `screenshots/` – Jaeger trace screenshots for the PetStore application  

```plaintext
replication-react-spring-boot/
├── jpetstore-backend-spring-boot/   # Spring Boot backend (submodule)
├── petstore-frontend-react/         # React frontend (submodule)
└── screenshots/                     # Screenshots of traces (frontend & backend)
```

---

## 🔧 Prerequisites  
Ensure you have the following tools installed (see [global README](../README.md#️-common-tools) for details):
- **Java JDK 11+ ☕**
- **Apache Maven 3.x 🛠️**
- **Node.js & npm 🟢**
- **Docker Compose 🐳**

---

## 🚀 Replication Steps
### 1. Launch the Telemetry Backend  
Before running the applications, start the telemetry backend (see [global README](../README.md#-global-replication-steps) for details):

1. Open a terminal and navigate to:
   ```sh
   cd telemetry/telemetry-backend
   ```
2. Launch the services using Docker Compose:
   ```sh
   docker-compose up -d
   ```
3. Verify that Jaeger is accessible at [http://localhost:16686](http://localhost:16686) for the frontend traces.

---

### 2. Instrumentation Integration  
Our prebuilt instrumentation agents are available in the global repository. For details, see the [global README](../README.md#2-use-the-prebuilt-instrumentation-agents).
- **Frontend Agent:**  
  Located in `telemetry/instrumentation-frontend-user-experience/prebuilt`  
  *(Integrate by including the appropriate `<script>` tag in your React app’s HTML.)*
- **Backend Agent:**  
  Located in `telemetry/instrumentation-backend-test-automation/prebuilt`  
  *(Attach as a Java agent when launching your backend application.)*

---

### 3. Run the Applications
#### 🖥️ Spring Boot Backend
1. **Database Setup:**
   In the `jpetstore-backend-spring-boot` folder, use Docker to setup the database:
     ```sh
     cd replication-angular-spring-boot/jpetstore-backend-spring-boot
     docker compose up -d
     ```
2. **Build the Backend:**  
   ```sh
   mvn clean package
   ```
3. **Run the Backend:**  
   Launch the Spring Boot application (*adjust the command if using the instrumentation agent*):
   ```sh
   java -jar target/PetStore-Monolithique-0.0.1-SNAPSHOT.jar
   ```
4. The backend service should be running on its configured port (e.g., [http://localhost:4000](http://localhost:4000)).

#### 🌐 React Frontend
1. Open a terminal and navigate to the React application folder:
   ```sh
   cd replication-react-spring-boot/petstore-frontend-react
   ```
2. Install dependencies and start the application:
   ```sh
   npm install
   npm run dev
   ```
3. Access the app at: [http://localhost:5173](http://localhost:5173)  
   *(If you prefer a preview mode, use `npm run preview` and visit [http://localhost:4173](http://localhost:4173)).*

---

### 4. Interact & Verify
- **User Interactions:** Interact with the React app (e.g., form submissions, clicks) to generate telemetry data.
- **Trace Verification:** Open Jaeger UI ([http://localhost:16686](http://localhost:16686)) to view and analyze the collected traces.

*For package-specific configuration details or further instructions, please refer to the README files within each submodule.*

---

## 🔍 Screenshots
### 🌐 Frontend  
#### Traces Overview  
This screenshot shows the Jaeger search page (trace timeline and comparator) for the last 100 frontend traces collected in the past hour.  
![Jaeger Frontend Trace Overview](screenshots/frontend/traces-overview.png)

#### Trace Detail  
This screenshot displays the detailed span view—including all tags (e.g., service name, user/session IDs, timestamps) and process metadata.  
![Jaeger Frontend Span Detail](screenshots/frontend/trace-detail.png)

---

### 🖥️ Backend  
#### Traces Overview  
This screenshot shows the Jaeger search page (trace timeline and comparator) for the last 100 backend traces collected in the past hour.  
![Jaeger Backend Trace Overview](screenshots/backend/traces-overview.png)

#### Trace Detail  
This screenshot displays the detailed span view—including all data for test automation (e.g., REST API classes, methods, arguments, results) and process metadata.  
![Jaeger Backend Trace Detail](screenshots/backend/trace-detail.png)