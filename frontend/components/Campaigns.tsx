import React from 'react';
import { AppState } from '../types';
import { Megaphone, Plus, Camera, ThumbsUp, Mail, Video } from 'lucide-react';

interface CampaignsProps {
  state: AppState;
  onNavigate: (view: any, prompt?: string) => void;
}

export const Campaigns: React.FC<CampaignsProps> = ({ state, onNavigate }) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Camera size={18} className="text-pink-600" />;
      case 'Facebook': return <ThumbsUp size={18} className="text-blue-600" />;
      case 'TikTok': return <Video size={18} className="text-black" />;
      case 'Email': return <Mail size={18} className="text-gray-600" />;
      default: return <Megaphone size={18} className="text-indigo-600" />;
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h2>
          <p className="text-gray-500">Automated promotions targeting World Cup fans.</p>
        </div>
        <button onClick={() => onNavigate('chat', 'Create a new marketing campaign targeting visiting fans.')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center">
          <Plus size={16} className="mr-2" /> Ask Agent to Create
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {state.campaigns.map(campaign => (
          <div key={campaign.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 flex justify-between items-start bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                  {getPlatformIcon(campaign.platform)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{campaign.name}</h3>
                  <p className="text-xs text-gray-500">{campaign.platform}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                campaign.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {campaign.status}
              </span>
            </div>
            
            <div className="p-5 flex-1">
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Target Audience</p>
                <p className="text-sm text-gray-800 font-medium">{campaign.targetAudience}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Generated Copy</p>
                <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-sm text-indigo-900 italic">
                  "{campaign.copy}"
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Budget</p>
                <p className="font-bold text-gray-900">${campaign.budget}</p>
              </div>
              <button onClick={() => onNavigate('chat', `Edit the campaign named "${campaign.name}"`)} className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Edit &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
