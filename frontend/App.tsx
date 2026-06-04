import React, { useState, useCallback } from 'react';
import { AppState, ViewState, ChatMessage, AgentAction } from './types';
import { INITIAL_STATE } from './constants';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AgentChat } from './components/AgentChat';
import { LocalGuide } from './components/Itinerary';
import { MallNavigator } from './components/VisaAssistant';
import { RetailInsights } from './components/BudgetCenter';
import { Campaigns } from './components/Campaigns';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const simulateSync = useCallback(() => {
    setAppState(prev => ({ ...prev, isSyncing: true }));
    setTimeout(() => {
      setAppState(prev => ({ ...prev, isSyncing: false }));
    }, 1500);
  }, []);

  const handleSendMessage = useCallback((message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  }, []);

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
            }
            break;
          case 'SET_ROUTE':
            if (Array.isArray(action.payload)) {
              newState.currentRoute = action.payload;
            }
            break;
          case 'CREATE_CAMPAIGN':
             if (action.payload && typeof action.payload === 'object') {
              const newCampaign = { ...action.payload, id: action.payload.id || Date.now().toString() };
              newState.campaigns = [...prevState.campaigns, newCampaign];
            }
            break;
          case 'ADD_INSIGHT':
             if (action.payload && typeof action.payload === 'object') {
              const newInsight = { ...action.payload, id: action.payload.id || Date.now().toString() };
              newState.insights = [...prevState.insights, newInsight];
            }
            break;
          case 'ADD_PROMOTION':
             if (action.payload && typeof action.payload === 'object') {
              const newPromo = { ...action.payload, id: action.payload.id || Date.now().toString() };
              newState.activePromotions = [...prevState.activePromotions, newPromo];
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
        return <Dashboard state={appState} onNavigate={setCurrentView} />;
      case 'chat':
        return <AgentChat 
                 state={appState} 
                 messages={chatMessages} 
                 onSendMessage={handleSendMessage} 
                 onAgentAction={handleAgentAction} 
               />;
      case 'guide':
        return <LocalGuide state={appState} onNavigate={setCurrentView} />;
      case 'navigator':
        return <MallNavigator state={appState} onNavigate={setCurrentView} />;
      case 'insights':
        return <RetailInsights state={appState} onNavigate={setCurrentView} />;
      case 'campaigns':
        return <Campaigns state={appState} onNavigate={setCurrentView} />;
      default:
        return <Dashboard state={appState} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden font-sans">
      <Sidebar 
        state={appState}
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />
      <main className="flex-1 relative h-full overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
