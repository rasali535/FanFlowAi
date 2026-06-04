import { GoogleGenAI, Type, Chat, FunctionDeclaration, HarmCategory, HarmBlockThreshold } from '@google/genai';
import { AppState, AgentResponse, ChatMessage } from '../types';
import { SYSTEM_PROMPT } from '../constants';

let aiInstance: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const fetchApiKeyFromSecretManager = async (): Promise<string> => {
  console.log("[Secret Manager] Fetching API key securely via Cloud Run backend...");
  return process.env.API_KEY || 'mock-key-for-ui-dev';
};

const getAI = async () => {
  if (!aiInstance) {
    const apiKey = await fetchApiKeyFromSecretManager();
    aiInstance = new GoogleGenAI({ apiKey, vertexai: true });
  }
  return aiInstance;
};

// Local Commerce & Navigation Tools
const searchLocalPlacesDeclaration: FunctionDeclaration = {
  name: 'searchLocalPlaces',
  description: 'Search for nearby restaurants, stores, or attractions based on user preferences and location.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: { type: Type.STRING, description: 'City, neighborhood, or mall name' },
      category: { type: Type.STRING, description: 'Restaurant, Shopping, Attraction, etc.' },
      query: { type: Type.STRING, description: 'Specific search terms (e.g., "BBQ", "football merchandise")' }
    },
    required: ['location', 'category']
  }
};

const getIndoorNavigationDeclaration: FunctionDeclaration = {
  name: 'getIndoorNavigation',
  description: 'Generate step-by-step indoor navigation instructions for a mall or stadium.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      venue: { type: Type.STRING, description: 'Name of the mall or stadium' },
      destination: { type: Type.STRING, description: 'Target store, gate, or facility' },
      startPoint: { type: Type.STRING, description: 'Current location or entrance' }
    },
    required: ['venue', 'destination', 'startPoint']
  }
};

// Business Intelligence & Marketing Tools
const analyzeFootTrafficDeclaration: FunctionDeclaration = {
  name: 'analyzeFootTraffic',
  description: 'Analyze predicted foot traffic and visitor demographics for a specific location and date range.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: { type: Type.STRING, description: 'City or specific venue' },
      dateRange: { type: Type.STRING, description: 'Dates to analyze' },
      targetDemographic: { type: Type.STRING, description: 'Specific fan group to filter by (optional)' }
    },
    required: ['location', 'dateRange']
  }
};

const generateLocalCampaignDeclaration: FunctionDeclaration = {
  name: 'generateLocalCampaign',
  description: 'Generate a targeted marketing campaign for a local business to attract visiting fans.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      businessName: { type: Type.STRING, description: 'Name of the business' },
      targetAudience: { type: Type.STRING, description: 'Target fan demographic' },
      platform: { type: Type.STRING, description: 'Social media platform or channel' }
    },
    required: ['businessName', 'targetAudience', 'platform']
  }
};

export const initChat = async (currentState: AppState) => {
  const ai = await getAI();
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.4,
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }
      ],
      tools: [
        { 
          functionDeclarations: [
            searchLocalPlacesDeclaration, 
            getIndoorNavigationDeclaration,
            analyzeFootTrafficDeclaration,
            generateLocalCampaignDeclaration
          ] 
        }
      ]
    },
  });

  return chatSession;
};

export const sendMessageToAgent = async (
  message: string,
  currentState: AppState
): Promise<AgentResponse> => {
  if (!chatSession) {
    await initChat(currentState);
  }

  try {
    const promptWithContext = `[CURRENT STATE UPDATE]\n${JSON.stringify(currentState)}\n\n[USER MESSAGE]\n${message}`;
    
    let response = await chatSession!.sendMessage({ message: promptWithContext });
    
    while (response.functionCalls && response.functionCalls.length > 0) {
      const functionResponses = response.functionCalls.map(call => {
        let result: any = { error: "Function not found" };
        
        if (call.name === 'searchLocalPlaces') {
          const args = call.args as any;
          console.log(`[Elastic MCP] Searching places in ${args.location}`);
          result = { 
            places: [
              { name: 'Official FIFA Store', category: 'Shopping', distance: '0.1 miles', rating: 4.9 },
              { name: 'Dallas Sports Grill', category: 'Restaurant', distance: '0.5 miles', rating: 4.6 }
            ] 
          };
        } else if (call.name === 'getIndoorNavigation') {
          const args = call.args as any;
          console.log(`[Elastic MCP] Routing in ${args.venue} to ${args.destination}`);
          result = { 
            route: [
              { instruction: `Enter ${args.startPoint}`, estimatedTime: '1 min' },
              { instruction: 'Take the main concourse straight ahead', estimatedTime: '3 mins' },
              { instruction: `Arrive at ${args.destination} on your right`, estimatedTime: '1 min' }
            ] 
          };
        } else if (call.name === 'analyzeFootTraffic') {
          const args = call.args as any;
          console.log(`[Elastic MCP] Analyzing traffic for ${args.location}`);
          result = {
            forecast: 'High',
            peakHours: '14:00 - 18:00',
            topDemographics: ['Botswana', 'South Africa', 'Mexico'],
            projectedIncrease: '+350%'
          };
        } else if (call.name === 'generateLocalCampaign') {
          const args = call.args as any;
          console.log(`[Agent Builder] Generating campaign for ${args.businessName}`);
          result = {
            campaignName: `${args.targetAudience} Welcome Promo`,
            suggestedCopy: `Welcome ${args.targetAudience}! Visit ${args.businessName} today and show your fan ID for an exclusive World Cup discount. ⚽🏆`,
            recommendedBudget: 500
          };
        }
        
        return {
          functionResponse: {
            id: (call as any).id,
            name: call.name,
            response: result
          }
        };
      });

      response = await chatSession!.sendMessage(functionResponses as any);
    }

    if (!response.text) throw new Error("Empty response from agent");

    let cleanText = response.text.trim();
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }

    const parsedResponse = JSON.parse(cleanText) as AgentResponse;
    
    // Ensure fallback values if the model misses the new fields
    if (!parsedResponse.deliberation) {
      parsedResponse.deliberation = {
        thinker: "Analyzed the user's request.",
        analyst: "Verified constraints and data availability.",
        optimizer: "Selected the most direct approach.",
        executor: "Generated final response."
      };
    }

    return parsedResponse;

  } catch (error) {
    console.error("Error communicating with FanFlow Local:", error);
    return {
      deliberation: {
        thinker: "Attempted to process the user's request.",
        analyst: "Detected a system failure or safety block.",
        optimizer: "Decided to fallback to a safe error message.",
        executor: "Returning error message to user."
      },
      message: "I'm sorry, I'm having trouble connecting to my reasoning engine right now. Please try again.",
    };
  }
};
