import React, { useState } from 'react';
import { AppState } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, ShoppingBag, Activity, Search, Database, ShieldCheck, Sparkles } from 'lucide-react';

interface RetailInsightsProps {
  state: AppState;
  onNavigate: (view: any, prompt?: string) => void;
}

const COLORS = ['#4f46e5', '#ec4899', '#06b6d4', '#10b981'];

export const RetailInsights: React.FC<RetailInsightsProps> = ({ state, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const demographicData = [
    { name: 'Botswana', value: 45 },
    { name: 'South Africa', value: 30 },
    { name: 'Mexico', value: 15 },
    { name: 'Other', value: 10 },
  ];

  const spendingData = [
    { category: 'Apparel', projected: 45000, actual: 52000 },
    { category: 'Food & Bev', projected: 30000, actual: 28000 },
    { category: 'Electronics', projected: 15000, actual: 18000 },
    { category: 'Souvenirs', projected: 25000, actual: 31000 },
  ];

  const handleElasticSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    // Simulate high-speed semantic search against the Elastic Cloud instance
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      let mockResults = [
        { name: 'Official FIFA Merchandise Store', category: 'Shopping', score: 0.98, location: 'Level 2, North Wing', status: 'Open' },
        { name: 'Texas BBQ & Grill', category: 'Restaurant', score: 0.92, location: 'Food Court, Level 3', status: 'Busy' },
        { name: 'Sports Gear Pro', category: 'Shopping', score: 0.87, location: 'Level 1, South Wing', status: 'Open' },
        { name: 'Dallas Galleria Concierge', category: 'Services', score: 0.81, location: 'Main Lobby', status: 'Available' }
      ];

      // Filter results slightly based on query to make it feel dynamic
      if (query.includes('food') || query.includes('eat') || query.includes('bbq') || query.includes('restaurant')) {
        mockResults = mockResults.filter(r => r.category === 'Restaurant');
      } else if (query.includes('gear') || query.includes('jersey') || query.includes('shop') || query.includes('store')) {
        mockResults = mockResults.filter(r => r.category === 'Shopping');
      }

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Retail Insights</h2>
          <p className="text-gray-500">Business intelligence and demand forecasting for {state.businessProfile.name}.</p>
        </div>
        <button onClick={() => onNavigate('chat', 'Analyze the latest foot traffic data and suggest staffing adjustments.')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center">
          <Activity size={16} className="mr-2" /> Ask BI Agent
        </button>
      </div>

      {/* Elastic Cloud Search Console */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <Database size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Elastic Cloud Search Console</h3>
              <p className="text-xs text-gray-500">High-speed semantic search powered by Elastic MCP</p>
            </div>
          </div>
          <div className="mt-2 md:mt-0 flex items-center space-x-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <ShieldCheck size={14} className="text-green-500" />
            <span className="font-mono">my-elasticsearch-project-ab6a4a</span>
          </div>
        </div>

        <form onSubmit={handleElasticSearch} className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stores, restaurants, or promotions (e.g., 'BBQ', 'jersey', 'FIFA')..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {searchResults.length > 0 && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Search Results</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((result, index) => (
                <div key={index} className="p-4 border border-gray-100 rounded-xl bg-gray-50 flex justify-between items-start hover:border-indigo-300 transition-all">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{result.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{result.category} • {result.location}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      {result.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                      <Sparkles size={12} className="mr-1" />
                      {(result.score * 100).toFixed(0)}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Demographics Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Users size={18} className="mr-2 text-indigo-600" /> Expected Fan Demographics
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <ShoppingBag size={18} className="mr-2 text-pink-600" /> Projected vs Actual Spending ($)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip cursor={{ fill: '#f9fafb' }} />
                <Legend />
                <Bar dataKey="projected" name="Projected" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Agent Generated Insights</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {state.insights.map((insight) => (
            <div key={insight.id} className="p-6 flex items-start justify-between hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-bold text-gray-900">{insight.title}</p>
                <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
              </div>
              <div className="text-right ml-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  insight.trend === 'up' ? 'bg-green-100 text-green-800' : 
                  insight.trend === 'down' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {insight.trend === 'up' && <TrendingUp size={12} className="mr-1" />}
                  {insight.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
