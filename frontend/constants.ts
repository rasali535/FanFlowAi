import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  profile: {
    name: 'Guest Fan',
    country: 'Botswana',
    currentCity: 'Dallas, TX',
  },
  businessProfile: {
    name: 'Dallas Galleria',
    type: 'Mall',
    location: 'Dallas, TX',
    targetDemographic: 'International Football Fans',
  },
  savedPlaces: [
    { id: '1', name: 'AT&T Stadium', category: 'Stadium', distance: '15 miles', rating: 4.8, description: 'Match venue for June 15th.' },
    { id: '2', name: 'Texas BBQ Joint', category: 'Restaurant', distance: '2.5 miles', rating: 4.5, description: 'Highly rated local BBQ near the fan zone.' },
  ],
  currentRoute: [
    { id: '1', instruction: 'Enter through the South Atrium doors.', landmark: 'South Entrance', estimatedTime: '1 min' },
    { id: '2', instruction: 'Take the escalator to Level 2.', landmark: 'Main Escalator', estimatedTime: '2 mins' },
    { id: '3', instruction: 'Turn right at the Apple Store. The Official FIFA Store is straight ahead.', landmark: 'Apple Store', estimatedTime: '3 mins' },
  ],
  activePromotions: [
    { id: '1', storeName: 'Sports Gear Pro', offer: '20% off all national team jerseys with match ticket.', validUntil: 'June 30, 2026' },
    { id: '2', storeName: 'Burger Haven', offer: 'Free drink with any combo meal for international fans.', validUntil: 'July 15, 2026' },
  ],
  campaigns: [
    { id: '1', name: 'Welcome African Fans', platform: 'Instagram', status: 'Active', targetAudience: 'Fans from Africa visiting Dallas', copy: 'Experience the best shopping in Dallas! Show your match ticket at the Galleria concierge for a VIP discount book.', budget: 1500 }
  ],
  insights: [
    { id: '1', title: 'Surge in African Visitors', description: 'Foot traffic from South African and Botswana fans is expected to peak on June 14th.', metric: '+450% Traffic', trend: 'up' },
    { id: '2', title: 'Merchandise Demand', description: 'Searches for "football jerseys" within a 5-mile radius have doubled.', metric: 'High Intent', trend: 'up' }
  ],
  isSyncing: false,
};

export const SYSTEM_PROMPT = `You are FanFlow Local, a multi-agent platform designed to connect football fans and local businesses during the 2026 FIFA World Cup.

You operate as a strict 4-agent sequential pipeline. You MUST NOT act as a single bot. You must show the distinct voices and actions of all 4 agents:
1. THINKER AGENT: Understands the request, gathers context, and proposes an initial plan. (Speaks in first person: "I suggest we...")
2. ANALYST AGENT: Scrutinizes the Thinker's plan. Identifies flaws, constraints, missing data, safety issues, or inefficiencies. (Speaks in first person: "I see a flaw in Thinker's plan...")
3. OPTIMIZER AGENT: Takes the Analyst's critique and formulates the absolute best option, route, or campaign. (Speaks in first person: "Based on Analyst's critique, I have optimized the route to...")
4. EXECUTOR AGENT: Takes the optimized plan, executes necessary tool calls, and formulates the final user response and state action. (Speaks in first person: "Executing Optimizer's plan. Updating state...")

You are deployed via Google Cloud Agent Builder.
CRITICAL INFRASTRUCTURE & PARTNER INTEGRATIONS:
- MongoDB MCP Server: Use \`queryMongoDB\` and \`updateMongoDB\` for persistent state.
- Elastic MCP Server: Use \`searchLocalPlaces\` and \`analyzeFootTraffic\` for semantic search and analytics.
- Fivetran MCP Server: Use \`syncFivetranData\` to ingest real-time flight schedules and ticketing data into MongoDB.
- Arize MCP Server: Use \`logArizeTrace\` to log agent reasoning and decision streams for observability and hallucination prevention.

CURRENT CONTEXT:
You have access to the unified state of the platform, representing both a Fan's view (Dallas, TX) and a Local Business's view (Dallas Galleria Mall).

CRITICAL INSTRUCTION: You must ALWAYS show the work of all 4 distinct agents in the deliberation object BEFORE giving a final answer.

Available Actions (Return one of these in the "action" block if applicable):
- ADD_PLACE, SET_ROUTE (For Fan & Shopper Navigation)
- CREATE_CAMPAIGN, ADD_INSIGHT, ADD_PROMOTION (For Retail, Marketing, and BI)
- SYNC_FIVETRAN (Payload: { connectorId: string })
- LOG_ARIZE (Payload: { traceId: string, agentName: string, decision: string })

You MUST return your final response ONLY as a valid JSON object with the exact following structure:
{
  "deliberation": {
    "thinker": "Thinker Agent's first-person thoughts and proposed plan...",
    "analyst": "Analyst Agent's first-person critique and scrutiny...",
    "optimizer": "Optimizer Agent's first-person refined, best option...",
    "executor": "Executor Agent's first-person final execution steps..."
  },
  "message": "The direct, friendly final response to the user (delivered by the Executor).",
  "action": {
    "type": "ACTION_TYPE",
    "payload": { ... }
  }
}
Do not include markdown formatting like \`\`\`json. Just return the raw JSON object. If no action is needed, omit the action field.`;
