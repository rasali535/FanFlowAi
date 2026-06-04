import React, { useState, useCallback } from 'react';
import { AppState, ViewState, ChatMessage, AgentAction } from './types';
import { INITIAL_STATE } from './constants';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AgentChat } from './components/AgentChat';
import { LocalGuide } from './components/LocalGuide';
import { MallNavigator } from './components/MallNavigator';
import { RetailInsights } from './components/RetailInsights';
import { Campaigns } from './components/Campaigns';
import { MemoryVault } from './components/MemoryVault';
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
              const newPlace = { ...action.payload, id: action.payload.id || Date.now().toString() };
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
              const newCampaign = { ...action.payload, id: action.payload.id || Date.now().toString() };
              newState.campaigns = [...prevState.campaigns, newCampaign];
              showToast(`Agent created campaign: ${newCampaign.name}`);
            }
            break;
          case 'ADD_INSIGHT':
             if (action.payload && typeof action.payload === 'object') {
              const newInsight = { ...action.payload, id: action.payload.id || Date.now().toString() };
              newState.insights = [...prevState.insights, newInsight];
              showToast(`Agent generated insight: ${newInsight.title}`);
            }
            break;
          case 'ADD_PROMOTION':
             if (action.payload && typeof action.payload === 'object') {
              const newPromo = { ...action.payload, id: action.payload.id || Date.now().toString() };
              newState.activePromotions = [...prevState.activePromotions, newPromo];
              showToast(`Agent added promotion for ${newPromo.storeName}`);
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
