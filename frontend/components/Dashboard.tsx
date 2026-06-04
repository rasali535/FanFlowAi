import React, { useState, useEffect } from 'react';
import { AppState } from '../types';
import { MapPin, Compass, Database, TrendingUp, Users, Target, Store, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  state: AppState;
  onNavigate: (view: any, prompt?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ state, onNavigate }) => {
  const [daysToWorldCup, setDaysToWorldCup] = useState(0);

  useEffect(() => {
    const wcDate = new Date('2026-06-11');
    const today = new Date();
    const diffTime = Math.abs(wcDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysToWorldCup(diffDays);
  }, []);

  const mockTrafficData = [
    { name: '10 AM', visitors: 400 },
    { name: '12 PM', visitors: 1500 },
    { name: '2 PM', visitors: 2200 },
    { name: '4 PM', visitors: 3500 },
    { name: '6 PM', visitors: 5000 },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      {/* Header & World Cup Countdown Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome to FanFlow Local</h2>
          <p className="text-gray-500 mt-1">Your smart companion for navigating and thriving during the World Cup 2026.</p>
        </div>
        <div className="flex items-center space-x-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-3 rounded-2xl shadow-md">
          <Trophy size={24} className="animate-bounce" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-90">World Cup 2026</p>
            <p className="text-lg font-extrabold">{daysToWorldCup} Days to Kickoff</p>
          </div>
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
            <p className="text-2xl font-bold text-gray-900">{state.savedPlaces.length}</p>
            <p className="text-xs text-gray-400">Local Guide</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('navigator')}>
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Compass size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Route</p>
            <p className="text-2xl font-bold text-gray-900">{state.currentRoute.length} steps</p>
            <p className="text-xs text-gray-400">Mall Navigator</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('insights')}>
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Est. Foot Traffic</p>
            <p className="text-2xl font-bold text-gray-900">12,600</p>
            <p className="text-xs text-green-500 flex items-center mt-1"><TrendingUp size={12} className="mr-1"/> Peak at 6 PM</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('campaigns')}>
          <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Campaigns</p>
            <p className="text-2xl font-bold text-gray-900">{state.campaigns.length}</p>
            <p className="text-xs text-gray-400 mt-1">Local Marketing</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Fan Experience & Local Guide */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <span className="bg-brand-100 text-brand-600 p-1.5 rounded-lg mr-2"><Store size={18} /></span>
                Your Saved Locations
              </h3>
              <button onClick={() => onNavigate('guide')} className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            {state.savedPlaces.length === 0 ? (
              <p className="text-gray-500 text-sm">No places saved yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.savedPlaces.map((place) => (
                  <div key={place.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 shadow-sm flex items-center justify-between hover:border-brand-300 transition-all">
                    <div>
                      <span className="font-bold text-gray-900 text-sm block">{place.name}</span>
                      <span className="text-xs text-gray-500">{place.category} • {place.distance}</span>
                    </div>
                    <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">★ {place.rating}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Promotions Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-md p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="text-lg font-bold flex items-center">
                <Sparkles size={20} className="mr-2 text-yellow-300" />
                Exclusive World Cup Promotions Active!
              </h4>
              <p className="text-sm text-indigo-100 mt-1">Show your match ticket at participating Galleria stores to unlock up to 25% off.</p>
            </div>
            <button onClick={() => onNavigate('navigator')} className="bg-white text-indigo-600 hover:bg-indigo-50 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm whitespace-nowrap">
              Explore Deals
            </button>
          </div>
        </div>

        {/* Right Column: Today's Mall Traffic Forecast */}
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
            <button onClick={() => onNavigate('insights')} className="w-full mt-6 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              View Detailed Insights
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
