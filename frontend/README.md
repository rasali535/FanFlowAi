# FanFlow Local - World Cup 2026 Agent Platform

FanFlow Local is an enterprise-grade multi-agent platform designed to connect football fans and local businesses during the 2026 FIFA World Cup in Dallas, TX. It solves two major challenges: helping fans navigate host cities efficiently (including flights, hotels, and indoor mall routing) and helping local businesses manage visitor demand to maximize revenue.

The platform operates as a strict 4-agent sequential pipeline (Thinker, Analyst, Optimizer, Executor) powered by Gemini 2.5 Flash, MongoDB Atlas, and Elastic Cloud.

---

## 🚀 Features

- **Swarm Chat**: Interact with the 4-agent sequential pipeline (Thinker, Analyst, Optimizer, Executor) and watch them deliberate in real-time.
- **Local Guide & Maps**: Interactive Google Maps with live routing from the user's current location to saved places.
- **Mall Navigator**: Indoor step-by-step routing inside the Dallas Galleria Mall with live promotions.
- **Travel & Bookings**: Search and book flights (Fivetran ingested) and hotels (Elastic Cloud searched), with automatic budget optimization.
- **Retail Insights**: High-speed semantic search console powered by Elastic Cloud MCP.
- **Local Marketing**: Automated campaign generation targeting specific fan demographics.
- **Memory Vault**: Interactive MongoDB MCP explorer to inspect persistent collections and documents.

---

## 📋 Prerequisites

Before running the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Gemini API Key (from Google AI Studio)

---

## 🛠️ Installation & Local Setup

Since this application is built as a modern React single-page application (SPA) using TypeScript and ESM import maps, it can be run locally using any simple static web server.

### Step 1: Clone the Repository
```sh
git clone https://github.com/rasali535/FanFlowAi.git
cd FanFlowAi
```

### Step 2: Configure Environment Variables
Create a `.env` file in the root directory of the project and add your Gemini API key:
```env
API_KEY="your_gemini_api_key_here"
```

### Step 3: Install the Elasticsearch Onboarding Skill
To configure and initialize your Elastic Cloud cluster with the required World Cup indices and dense vector mappings, run the onboarding skill:
```sh
npx skills add elastic/agent-skills --skill elasticsearch-onboarding -y
```

### Step 4: Run the Application
You can run the application locally using a lightweight static server like `serve` or `vite`.

#### Option A: Using `serve` (Recommended for quick start)
```sh
# Install serve globally if you don't have it
npm install -g serve

# Run the server in the root directory
serve .
```
Open your browser and navigate to `http://localhost:3000`.

#### Option B: Using Vite (For development)
If you prefer a hot-reloading development environment, you can initialize a basic Vite project:
```sh
# Install Vite development dependency
npm install --save-dev vite

# Start the Vite development server
npx vite
```
Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

---

## 🔌 Partner Integrations & Connection Strings

The application is pre-configured to connect to the following live cloud instances:

### 1. MongoDB MCP Server (Persistent Memory)
- **Primary Connection String**: `mongodb+srv://ras:fS4Z4XmSxgoaktkD@fanflowai.edptdip.mongodb.net/?appName=FanflowAi`
- **Atlas SQL Connection String**: `mongodb://atlas-sql-6a2192f2ce09e4f02d936212-bo0yaz.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin`
- **Usage**: Persists saved places, active routes, marketing campaigns, flights, hotels, and itinerary events. You can inspect these live collections in the **Memory Vault** tab.

### 2. Elastic Cloud MCP Server (Semantic Search & Analytics)
- **Cloud Endpoint**: `https://my-elasticsearch-project-ab6a4a.es.us-central1.gcp.elastic.cloud`
- **API Key**: `bkVVSWs1NEJZQmFnZmpLME9WRVM6R19hYTlpV0xpaUwzbjBUUHFlUVNHQQ==`
- **Usage**: Powers high-speed semantic search in the **Retail Insights** tab and indoor routing in the **Mall Navigator**.

### 3. Fivetran MCP Server (Real-Time Ingestion)
- **Usage**: Ingests real-time flight schedules and World Cup ticketing data directly into MongoDB to keep marketing campaigns and travel recommendations dynamic.

### 4. Arize MCP Server (Observability & Guardrails)
- **Usage**: Logs agent reasoning and decision traces to prevent hallucinations and ensure 100% compliance with safety guardrails.

---

## ☁️ Production Deployment (Cloud Run)

When deploying the custom tool backend or proxy to Google Cloud Run, ensure you configure the following environment variable to resolve origin-checking and CORS issues:

```sh
PROXY_HEADER="X-Vertex-App-Shim"
```

This header ensures that all outgoing requests from the frontend proxy are correctly identified and authorized by the backend middleware.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
