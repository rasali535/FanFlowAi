import React, { useState } from 'react';
import { AppState, LocalPlace } from '../types';
import { MapPin, Store, Utensils, Ticket, Navigation, Crosshair, Map as MapIcon } from 'lucide-react';

interface LocalGuideProps {
  state: AppState;
  onNavigate: (view: any, prompt?: string) => void;
}

export const LocalGuide: React.FC<LocalGuideProps> = ({ state, onNavigate }) => {
  const [selectedPlace, setSelectedPlace] = useState<LocalPlace | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Restaurant': return <Utensils size={20} />;
      case 'Shopping': return <Store size={20} />;
      case 'Stadium': return <Ticket size={20} />;
      default: return <MapPin size={20} />;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case 'Restaurant': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Shopping': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Stadium': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-blue-100 text-blue-600 border-blue-200';
    }
  };

  const handleGPS = () => {
    setIsLocating(true);
    // Simulate GPS delay
    setTimeout(() => {
      setIsLocating(false);
      setSelectedPlace(null); // Reset to show general area
      alert("GPS Location found: Near Dallas Fan Zone. Map updated to your current location.");
    }, 1500);
  };

  // Use Directions Mode (saddr & daddr) if a place is selected to draw the route on the map
  const mapUrl = selectedPlace
    ? `https://maps.google.com/maps?saddr=${encodeURIComponent(state.profile.currentCity)}&daddr=${encodeURIComponent(selectedPlace.name + ", " + state.profile.currentCity)}&t=&z=12&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(state.profile.currentCity)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Local Guide & Maps</h2>
          <p className="text-gray-500">Personalized recommendations and navigation in {state.profile.currentCity}.</p>
        </div>
        <button onClick={() => onNavigate('chat', 'Suggest some highly rated local attractions near my current location.')} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm flex items-center">
          <Navigation size={16} className="mr-2" /> Ask Agent for Suggestions
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-[500px]">
        {/* Left: Places List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <MapIcon size={20} className="mr-2 text-brand-600" /> Saved Locations
          </h3>
          
          {state.savedPlaces.length === 0 ? (
            <div className="text-center py-12 flex-1 flex flex-col justify-center">
              <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No places saved</h3>
              <p className="text-gray-500 mt-1">Ask FanFlow Local to find restaurants or stores nearby.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2">
              {state.savedPlaces.map((place) => (
                <div 
                  key={place.id} 
                  onClick={() => setSelectedPlace(place)}
                  className={`bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col ${
                    selectedPlace?.id === place.id ? 'border-brand-500 ring-1 ring-brand-500' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${getColor(place.category)}`}>
                        {getIcon(place.category)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{place.name}</h3>
                        <p className="text-xs text-gray-500">{place.category} • {place.distance}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">★ {place.rating}</span>
                  </div>
                  
                  <p className="text-xs text-gray-600 flex-1 mb-4 line-clamp-2">{place.description}</p>
                  
                  <div className="flex space-x-2 mt-auto">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onNavigate('navigator', `Navigate me to ${place.name}`); 
                      }} 
                      className="flex-1 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors"
                    >
                      Indoor Map
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onNavigate('chat', `Find places similar to ${place.name}`); 
                      }} 
                      className="flex-1 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Find Similar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Google Maps Embed */}
        <div className="lg:col-span-1 h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-sm border border-gray-200 relative bg-gray-200">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={mapUrl}
            allowFullScreen
            title="Google Maps"
          ></iframe>
          
          {/* GPS Locate Me Button */}
          <button 
            onClick={handleGPS} 
            className="absolute bottom-6 right-6 bg-white p-3 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all border border-gray-100 group"
            title="Use GPS to find my location"
          >
            <Crosshair size={24} className={isLocating ? "animate-spin text-brand-500" : ""} />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Locate Me
            </span>
          </button>

          {/* Map Overlay Info */}
          <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Currently Viewing</p>
            <p className="text-sm font-bold text-gray-900 truncate">{selectedPlace ? `${selectedPlace.name} (Route Active)` : state.profile.currentCity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
