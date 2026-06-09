import React, { useState, useCallback } from 'react';
import { AppState, ViewState, ChatMessage, AgentAction, LocalPlace, Campaign, StorePromotion, FlightBooking, HotelBooking, ItineraryEvent } from './types';
import { INITIAL_STATE } from './constants';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AgentChat } from './components/AgentChat';
import { LocalGuide } from './components/LocalGuide';
import { MallNavigator } from './components/MallNavigator';
import { RetailInsights } from './components/RetailInsights';
import { Campaigns } from './components/Campaigns';
import { MemoryVault } from './components/MemoryVault';
import { TravelBookings } from './components/TravelBookings';
import { CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [pendingPrompt, setPendingPrompt] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  const simulateSync = useCallback(() => {
    setAppState(prev => ({ ...prev, isSyncing: true }));
    setTimeout(() => {
      setAppState(prev => ({ ...prev, isSyncing: false }));
    }, 1500);
  }, []);

  const handleNavigate = useCallback((view: ViewState, prompt?: string) => {
    setCurrentView(view);
    if (prompt) {
      setPendingPrompt(prompt);
    }
  }, []);

  const handleSendMessage = useCallback((message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const handleAgentAction = useCallback((action: AgentAction) => {
    console.log("Executing Agent Action:", action);
    
    setAppState(prevState => {
      let newState = { ...prevState };
      
      try {
        switch (action.type) {
          case 'ADD_PLACE':
            if (action.payload && typeof action.payload === 'object') {
              const p = action.payload;
              const name = p.name || p.placeName || p.title || 'New Place';
              const category = p.category || 'Shopping';
              const distance = p.distance || '0.5 miles';
              const rating = Number(p.rating || 4.5);
              const description = p.description || p.details || 'A great local spot.';
              
              const newPlace: LocalPlace = {
                id: p.id || Date.now().toString(),
                name,
                category,
                distance,
                rating,
                description
              };
              newState.savedPlaces = [...prevState.savedPlaces, newPlace];
              showToast(`Agent saved place: ${newPlace.name}`);
            }
            break;
          case 'SET_ROUTE':
            if (Array.isArray(action.payload)) {
              newState.currentRoute = action.payload;
              showToast(`Agent generated new indoor route (${action.payload.length} steps)`);
            }
            break;
          case 'CREATE_CAMPAIGN':
             if (action.payload && typeof action.payload === 'object') {
              const p = action.payload;
              const campaignData = p.campaign || p.campaign_data || p;
              const name = campaignData.name || campaignData.campaignName || campaignData.campaign_name || campaignData.title || 'New Campaign';
              const platform = campaignData.platform || 'Instagram';
              const status = campaignData.status || 'Active';
              const targetAudience = campaignData.targetAudience || campaignData.target_audience || campaignData.audience || 'World Cup Fans';
              const copy = campaignData.copy || campaignData.suggestedCopy || campaignData.text || campaignData.ad_copy || 'Check out our World Cup specials!';
              const budget = Number(campaignData.budget || campaignData.recommendedBudget || campaignData.cost || 500);
              
              const newCampaign: Campaign = {
                id: p.id || Date.now().toString(),
                name,
                platform,
                status,
                targetAudience,
                copy,
                budget
              };
              newState.campaigns = [...prevState.campaigns, newCampaign];
              showToast(`Agent created campaign: ${newCampaign.name}`);
            }
            break;
          case 'ADD_INSIGHT':
             if (action.payload && typeof action.payload === 'object') {
              const p = action.payload;
              const title = p.title || p.insightTitle || 'New Insight';
              const description = p.description || p.details || 'No description provided.';
              const metric = p.metric || 'N/A';
              const trend = p.trend || 'neutral';
              
              const newInsight: RetailInsight = {
                id: p.id || Date.now().toString(),
                title,
                description,
                metric,
                trend
              };
              newState.insights = [...prevState.insights, newInsight];
              showToast(`Agent generated insight: ${newInsight.title}`);
            }
            break;
          case 'ADD_PROMOTION':
             if (action.payload && typeof action.payload === 'object') {
              const p = action.payload;
              const storeName = p.storeName || p.store_name || p.name || 'Local Store';
              const offer = p.offer || p.promotion || p.discount || 'Special Offer';
              const validUntil = p.validUntil || p.valid_until || p.expiry || 'June 30, 2026';
              
              const newPromo: StorePromotion = {
                id: p.id || Date.now().toString(),
                storeName,
                offer,
                validUntil
              };
              newState.activePromotions = [...prevState.activePromotions, newPromo];
              showToast(`Agent added promotion for ${newPromo.storeName}`);
            }
            break;
          case 'BOOK_FLIGHT':
             if (action.payload && typeof action.payload === 'object') {
              const p = action.payload;
              const airline = p.airline || 'Qatar Airways';
              const flightNumber = p.flightNumber || p.flight_number || 'QR 729';
              const departure = p.departure || 'Gaborone (GBE)';
              const arrival = p.arrival || 'Dallas (DFW)';
              const price = Number(p.price || 1500);
              
              const newFlight: FlightBooking = {
                id: p.id || Date.now().toString(),
                airline,
                flightNumber,
                departure,
                arrival,
                price,
                status: 'Booked'
              };
              // Replace existing flight if it's an optimization/upgrade, otherwise append
              if (prevState.flights.length > 0) {
                newState.flights = [newFlight];
              } else {
                newState.flights = [...prevState.flights, newFlight];
              }
              showToast(`Agent booked flight: ${newFlight.airline} ${newFlight.flightNumber}`);
            }
            break;
          case 'BOOK_HOTEL':
             if (action.payload && typeof action.payload === 'object') {
              const p = action.payload;
              const hotelName = p.hotelName || p.hotel_name || p.name || 'Galleria Luxury Suites';
              const checkIn = p.checkIn || p.check_in || 'June 11, 2026';
              const checkOut = p.checkOut || p.check_out || 'June 18, 2026';
              const price = Number(p.price || 1200);
              
              const newHotel: HotelBooking = {
                id: p.id || Date.now().toString(),
                hotelName,
                checkIn,
                checkOut,
                price,
                status: 'Booked'
              };
              // Replace existing hotel if it's an optimization/upgrade, otherwise append
              if (prevState.hotels.length > 0) {
                newState.hotels = [newHotel];
              } else {
                newState.hotels = [...prevState.hotels, newHotel];
              }
              showToast(`Agent booked hotel: ${newHotel.hotelName}`);
            }
            break;
          case 'ADD_ITINERARY_EVENT':
             if (action.payload && typeof action.payload === 'object') {
              const p = action.payload;
              const date = p.date || '2026-06-11';
              const time = p.time || '12:00';
              const title = p.title || 'New Event';
              const description = p.description || p.details || 'World Cup Activity';
              const type = p.type || 'Activity';
              
              const newEvent: ItineraryEvent = {
                id: p.id || Date.now().toString(),
                date,
                time,
                title,
                description,
                type
              };
              newState.itineraryEvents = [...prevState.itineraryEvents, newEvent];
              showToast(`Agent added itinerary event: ${newEvent.title}`);
            }
            break;
          case 'SYNC_FIVETRAN':
             if (action.payload && typeof action.payload === 'object') {
               showToast(`Fivetran synced real-time data from ${action.payload.connectorId || 'source'}`);
             }
             break;
          case 'LOG_ARIZE':
             if (action.payload && typeof action.payload === 'object') {
               showToast(`Arize logged execution trace for ${action.payload.agentName || 'agent'}`);
             }
             break;
          default:
            console.warn("Unknown action type:", action.type);
        }
      } catch (e) {
        console.error("Error applying agent action to state:", e);
      }

      return newState;
    });

    simulateSync();
  }, [simulateSync]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard state={appState} onNavigate={handleNavigate} />;
      case 'chat':
        return <AgentChat 
                 state={appState} 
                 messages={chatMessages} 
                 onSendMessage={handleSendMessage} 
                 onAgentAction={handleAgentAction}
                 pendingPrompt={pendingPrompt}
                 clearPendingPrompt={() => setPendingPrompt('')}
               />;
      case 'guide':
        return <LocalGuide state={appState} onNavigate={handleNavigate} />;
      case 'navigator':
        return <MallNavigator state={appState} onNavigate={handleNavigate} />;
      case 'insights':
        return <RetailInsights state={appState} onNavigate={handleNavigate} />;
      case 'campaigns':
        return <Campaigns state={appState} onNavigate={handleNavigate} />;
      case 'vault':
        return <MemoryVault state={appState} onNavigate={handleNavigate} />;
      case 'travel':
        return <TravelBookings state={appState} onNavigate={handleNavigate} />;
      default:
        return <Dashboard state={appState} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden font-sans relative">
      <Sidebar 
        state={appState}
        currentView={currentView} 
        onViewChange={handleNavigate} 
      />
      <main className="flex-1 relative h-full overflow-hidden">
        {renderView()}
      </main>

      {/* Agentic Action Toast Notification */}
      {toast && (
        <div className="absolute bottom-6 right-6 bg-gray-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center z-50 animate-bounce border border-gray-700">
          <CheckCircle2 size={20} className="text-green-400 mr-3" />
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Autonomous Action</p>
            <p className="text-sm font-medium">{toast}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
