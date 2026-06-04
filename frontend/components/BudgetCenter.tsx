import React from 'react';
import { AppState } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, ShoppingBag, Activity } from 'lucide-react';

interface RetailInsightsProps {
  state: AppState;
  onNavigate: (view: any) => void;
}

const COLORS = ['#4f46e5', '#ec4899', '#06b6d4', '#10b981'];

export const RetailInsights: React.FC<RetailInsightsProps> = ({ state, onNavigate }) => {
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

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Retail Insights</h2>
          <p className="text-gray-500">Business intelligence and demand forecasting for {state.businessProfile.name}.</p>
        </div>
        <button onClick={() => onNavigate('chat')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center">
          <Activity size={16} className="mr-2" /> Ask BI Agent
        </button>
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
