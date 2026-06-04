import React from 'react';
import { ViewState, AppState } from '../types';
import { 
  LayoutDashboard, 
  MessageSquare, 
  MapPin, 
  Compass, 
  BarChart3,
  Megaphone,
  Store,
  Database,
  PlaneTakeoff
} from 'lucide-react';

interface SidebarProps {
  state: AppState;
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ state, currentView, onViewChange }) => {
  const navItems: { id: ViewState; label: string; icon: React.ReactNode; section: string }[] = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} />, section: 'Main' },
    { id: 'chat', label: 'FanFlow Local AI', icon: <MessageSquare size={20} />, section: 'Main' },
    { id: 'vault', label: 'Memory Vault', icon: <Database size={20} />, section: 'Main' },
    
    { id: 'guide', label: 'Local Guide', icon: <MapPin size={20} />, section: 'Fan Experience' },
    { id: 'navigator', label: 'Mall Navigator', icon: <Compass size={20} />, section: 'Fan Experience' },
    { id: 'travel', label: 'Travel & Bookings', icon: <PlaneTakeoff size={20} />, section: 'Fan Experience' },
    
    { id: 'insights', label: 'Retail Insights', icon: <BarChart3 size={20} />, section: 'Business Hub' },
    { id: 'campaigns', label: 'Local Marketing', icon: <Megaphone size={20} />, section: 'Business Hub' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 flex items-center space-x-3 border-b border-gray-100">
        <div className="p-2 rounded-lg text-white bg-brand-500">
          <Store size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">FanFlow Local</h1>
          <p className="text-xs text-gray-500">World Cup 2026</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {['Main', 'Fan Experience', 'Business Hub'].map(section => (
          <div key={section}>
            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{section}</h3>
            <div className="space-y-1">
              {navItems.filter(item => item.section === section).map((item) => (
                <button
                  key={item.id}
                  data-nav={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors duration-200 ${
                    currentView === item.id
                      ? 'bg-brand-50 text-brand-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3 px-2 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-brand-500">
            {state.profile.name.charAt(0)}
          </div>
          <div className="text-sm overflow-hidden">
            <p className="font-medium text-gray-900 truncate">{state.profile.name}</p>
            <p className="text-xs text-gray-500 truncate">{state.profile.currentCity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
