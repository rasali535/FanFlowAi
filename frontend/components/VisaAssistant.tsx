import React from 'react';
import { AppState } from '../types';
import { Compass, Map, Tag, Store, MapPin } from 'lucide-react';

interface MallNavigatorProps {
  state: AppState;
  onNavigate: (view: any, prompt?: string) => void;
}

export const MallNavigator: React.FC<MallNavigatorProps> = ({ state, onNavigate }) => {
  const mapQuery = `${state.businessProfile.name}, ${state.businessProfile.location}`;

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mall Navigator</h2>
          <p className="text-gray-500">Indoor routing and live promotions at {state.businessProfile.name}.</p>
        </div>
        <button onClick={() => onNavigate('chat', 'Generate a new indoor route to the nearest food court.')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
          <Map size={16} className="mr-2" /> New Route
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Indoor Route & Map */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Venue Map */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 h-64 relative overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0, borderRadius: '0.75rem' }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              title="Venue Map"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/50 flex items-center">
              <MapPin size={14} className="text-blue-600 mr-1.5" />
              <span className="text-xs font-bold text-gray-900">{state.businessProfile.name}</span>
            </div>
          </div>

          {/* Route Steps */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Compass size={20} className="mr-2 text-blue-600" /> Indoor Route Instructions
            </h3>
            
            {state.currentRoute.length === 0 ? (
              <p className="text-gray-500">No active route. Ask the agent to guide you to a store.</p>
            ) : (
              <div className="relative border-l-2 border-blue-100 ml-4 space-y-6">
                {state.currentRoute.map((step, index) => (
                  <div key={step.id} className="relative pl-6">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center">
                      {index === state.currentRoute.length - 1 && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                      <p className="font-medium text-gray-900 text-sm">{step.instruction}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Store size={12} className="mr-1" /> {step.landmark}
                        </span>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {step.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Active Promotions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl shadow-sm p-6 text-white">
            <h3 className="font-bold mb-2 flex items-center">
              <Tag size={18} className="mr-2" /> Live Mall Promotions
            </h3>
            <p className="text-sm text-brand-100 mb-4">
              Exclusive offers for World Cup fans currently inside the mall.
            </p>
            
            <div className="space-y-3">
              {state.activePromotions.map(promo => (
                <div key={promo.id} className="bg-white/10 border border-white/20 rounded-xl p-3 backdrop-blur-sm">
                  <p className="font-bold text-sm">{promo.storeName}</p>
                  <p className="text-xs text-brand-50 mt-1">{promo.offer}</p>
                  <p className="text-[10px] text-brand-200 mt-2">Valid until {promo.validUntil}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
