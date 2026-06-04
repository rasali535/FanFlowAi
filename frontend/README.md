# FanFlow Local - World Cup 2026 Agent Platform

FanFlow Local is an enterprise-grade multi-agent platform designed to connect football fans and local businesses during the 2026 FIFA World Cup in Dallas, TX. It solves two major challenges: helping fans navigate host cities efficiently and helping local businesses manage visitor demand to maximize revenue.

## 🚀 Multi-Agent Swarm Architecture

The platform operates as a strict 4-agent sequential pipeline to ensure high-quality reasoning, planning, and execution:
1. **Thinker Agent**: Analyzes user intent, gathers context, and proposes an initial strategy.
2. **Analyst Agent**: Scrutinizes the Thinker's plan, identifying logistical constraints, safety issues, or inefficiencies.
3. **Optimizer Agent**: Refines the plan based on the Analyst's critique to formulate the absolute best option or route.
4. **Executor Agent**: Executes tool calls (MongoDB, Elastic, Fivetran, Arize) and delivers the final response.

---

## 🔌 Partner Integrations & Connection Strings

### 1. MongoDB MCP Server (Persistent Memory)
* **Primary Connection String**: `mongodb+srv://ras:fS4Z4XmSxgoaktkD@fanflowai.edptdip.mongodb.net/?appName=FanflowAi`
* **Atlas SQL Connection String**: `mongodb://atlas-sql-6a2192f2ce09e4f02d936212-bo0yaz.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin`
* **Usage**: Acts as the long-term memory vault for saved places, active routes, marketing campaigns, and promotions.

### 2. Elastic Cloud MCP Server (Semantic Search & Analytics)
* **Cloud Endpoint**: `https://my-elasticsearch-project-ab6a4a.es.us-central1.gcp.elastic.cloud`
* **API Key**: `bkVVSWs1NEJZQmFnZmpLME9WRVM6R19hYTlpV0xpaUwzbjBUUHFlUVNHQQ==`
* **Usage**: Powers high-speed semantic search for local businesses, indoor mall navigation, and real-time foot traffic analytics.

### 3. Fivetran MCP Server (Real-Time Ingestion)
* **Usage**: Simulates real-time ingestion of Dallas flight schedules and World Cup ticketing data directly into MongoDB to keep marketing campaigns dynamic.

### 4. Arize MCP Server (Observability & Guardrails)
* **Usage**: Logs agent reasoning and decision traces to prevent hallucinations and ensure 100% compliance with safety guardrails.

---

## 🛠️ Installation & Setup

To install the Elasticsearch onboarding skill as referenced in the architecture:
```sh
npx skills add elastic/agent-skills --skill elasticsearch-onboarding -y
```
