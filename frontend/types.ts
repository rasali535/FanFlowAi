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

export interface FlightBooking {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  price: number;
  status: 'Planned' | 'Booked';
}

export interface HotelBooking {
  id: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  price: number;
  status: 'Planned' | 'Booked';
}

export interface ItineraryEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  type: 'Match' | 'Flight' | 'Hotel' | 'Activity';
}

export interface AppState {
  profile: UserProfile;
  businessProfile: BusinessProfile;
  savedPlaces: LocalPlace[];
  currentRoute: MallRouteStep[];
  activePromotions: StorePromotion[];
  campaigns: Campaign[];
  insights: RetailInsight[];
  flights: FlightBooking[];
  hotels: HotelBooking[];
  itineraryEvents: ItineraryEvent[];
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

export type ViewState = 'dashboard' | 'chat' | 'guide' | 'navigator' | 'campaigns' | 'insights' | 'vault' | 'travel';

export interface AgentAction {
  type: 'ADD_PLACE' | 'SET_ROUTE' | 'CREATE_CAMPAIGN' | 'ADD_INSIGHT' | 'ADD_PROMOTION' | 'SYNC_FIVETRAN' | 'LOG_ARIZE' | 'BOOK_FLIGHT' | 'BOOK_HOTEL' | 'ADD_ITINERARY_EVENT';
  payload: any;
}

export interface AgentResponse {
  deliberation: AgentDeliberation;
  message: string;
  action?: AgentAction;
}
