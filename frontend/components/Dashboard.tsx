import React from 'react';
import { AppState } from '../types';
import { MapPin, Compass, Database, TrendingUp, Users, Target, Store } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  state: AppState;
  onNavigate: (view: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ state, onNavigate }) => {
  const mockTrafficData = [
    { name: '10 AM', visitors: 400 },
    { name: '12 PM', visitors: 1500 },
    { name: '2 PM', visitors: 2200 },
    { name: '4 PM', visitors: 3500 },
    { name: '6 PM', visitors: 5000 },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">FanFlow Local Overview</h2>
          <p className="text-gray-500">Connecting fans and local businesses in {state.profile.currentCity}.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <Database size={16} className={state.isSyncing ? 'text-brand-500 animate-pulse' : 'text-brand-500'} />
          <span>{state.isSyncing ? 'Syncing to MCP...' : 'MongoDB & Elastic MCP Synced'}</span>
        </div>
      </div>

      {/* Unified Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('guide')}>
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Saved Places</p>
            <p className="text-xl font-bold text-gray-900">{state.savedPlaces.length}</p>
            <p className="text-xs text-gray-400">Local Guide</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('navigator')}>
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Compass size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Route</p>
            <p className="text-xl font-bold text-gray-900">{state.currentRoute.length} steps</p>
            <p className="text-xs text-gray-400">Mall Navigator</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('insights')}>
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Est. Foot Traffic</p>
            <p className="text-xl font-bold text-gray-900">12,600</p>
            <p className="text-xs text-green-500 flex items-center mt-1"><TrendingUp size={12} className="mr-1"/> Peak at 6 PM</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('campaigns')}>
          <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Campaigns</p>
            <p className="text-xl font-bold text-gray-900">{state.campaigns.length}</p>
            <p className="text-xs text-gray-400 mt-1">Local Marketing</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Fan Experience */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-brand-100 text-brand-600 p-1 rounded mr-2"><Store size={18} /></span>
              Local Recommendations
            </h3>
            {state.savedPlaces.length === 0 ? (
              <p className="text-gray-500 text-sm">No places saved yet.</p>
            ) : (
              <div className="space-y-4">
                {state.savedPlaces.map((place) => (
                  <div key={place.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-900 text-sm block">{place.name}</span>
                      <span className="text-xs text-gray-500">{place.category} • {place.distance}</span>
                    </div>
                    <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded-full">★ {place.rating}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => onNavigate('guide')} className="w-full mt-6 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Open Local Guide
            </button>
          </div>
        </div>

        {/* Right Column: Business Intelligence */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Mall Traffic Forecast</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTrafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="visitors" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <button onClick={() => onNavigate('insights')} className="w-full mt-6 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              View Detailed Insights
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
