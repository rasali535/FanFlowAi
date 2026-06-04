export interface UserProfile {
  name: string;
  country: string;
  currentCity: string;
}

export interface BusinessProfile {
  name: string;
  type: 'Mall' | 'Restaurant' | 'Retail' | 'Stadium';
  location: string;
  targetDemographic: string;
}

export interface LocalPlace {
  id: string;
  name: string;
  category: 'Restaurant' | 'Shopping' | 'Attraction' | 'Stadium';
  distance: string;
  rating: number;
  description: string;
}

export interface MallRouteStep {
  id: string;
  instruction: string;
  landmark: string;
  estimatedTime: string;
}

export interface StorePromotion {
  id: string;
  storeName: string;
  offer: string;
  validUntil: string;
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'Facebook' | 'Instagram' | 'TikTok' | 'Google Ads' | 'Email';
  status: 'Draft' | 'Active' | 'Completed';
  targetAudience: string;
  copy: string;
  budget: number;
}

export interface RetailInsight {
  id: string;
  title: string;
  description: string;
  metric: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface AppState {
  profile: UserProfile;
  businessProfile: BusinessProfile;
  savedPlaces: LocalPlace[];
  currentRoute: MallRouteStep[];
  activePromotions: StorePromotion[];
  campaigns: Campaign[];
  insights: RetailInsight[];
  isSyncing: boolean;
}

export interface AgentDeliberation {
  thinker: string;
  analyst: string;
  optimizer: string;
  executor: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  deliberation?: AgentDeliberation;
  timestamp: Date;
  actionTaken?: string;
}

export type ViewState = 'dashboard' | 'chat' | 'guide' | 'navigator' | 'campaigns' | 'insights';

export interface AgentAction {
  type: 'ADD_PLACE' | 'SET_ROUTE' | 'CREATE_CAMPAIGN' | 'ADD_INSIGHT' | 'ADD_PROMOTION';
  payload: any;
}

export interface AgentResponse {
  deliberation: AgentDeliberation;
  message: string;
  action?: AgentAction;
}
