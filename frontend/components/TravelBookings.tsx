import React, { useState } from 'react';
import { AppState } from '../types';
import { Plane, Hotel, Calendar, Plus, DollarSign, CheckCircle, Clock, MapPin, Search, Sparkles, TrendingDown, AlertCircle } from 'lucide-react';

interface TravelBookingsProps {
  state: AppState;
  onNavigate: (view: any, prompt?: string) => void;
}

export const TravelBookings: React.FC<TravelBookingsProps> = ({ state, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'flights' | 'hotels'>('itinerary');
  const [flightSearch, setFlightSearch] = useState({ from: 'GBE', to: 'DFW', date: '2026-06-10' });
  const [hotelSearch, setHotelSearch] = useState({ city: 'Dallas', checkIn: '2026-06-11', checkOut: '2026-06-18' });
  const [isSearching, setIsSearching] = useState(false);
  const [flightResults, setFlightResults] = useState<any[]>([]);
  const [hotelResults, setHotelResults] = useState<any[]>([]);

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setFlightResults([
        { id: 'f1', airline: 'Qatar Airways', flightNumber: 'QR 729', departure: `${flightSearch.from} - June 10, 2026`, arrival: `${flightSearch.to} - June 11, 2026`, price: 1550, duration: '24h 15m' },
        { id: 'f2', airline: 'Ethiopian Airlines', flightNumber: 'ET 501', departure: `${flightSearch.from} - June 10, 2026`, arrival: `${flightSearch.to} - June 11, 2026`, price: 1380, duration: '22h 30m' },
        { id: 'f3', airline: 'Delta Air Lines', flightNumber: 'DL 204', departure: `${flightSearch.from} - June 10, 2026`, arrival: `${flightSearch.to} - June 11, 2026`, price: 1720, duration: '21h 45m' }
      ]);
      setIsSearching(false);
    }, 1000);
  };

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setHotelResults([
        { id: 'h1', hotelName: 'Galleria Luxury Suites', checkIn: hotelSearch.checkIn, checkOut: hotelSearch.checkOut, price: 1200, rating: 4.8, location: 'Dallas Galleria Mall' },
        { id: 'h2', hotelName: 'Stadium View Inn', checkIn: hotelSearch.checkIn, checkOut: hotelSearch.checkOut, price: 850, rating: 4.2, location: '1.5 miles from AT&T Stadium' },
        { id: 'h3', hotelName: 'Downtown Boutique Hotel', checkIn: hotelSearch.checkIn, checkOut: hotelSearch.checkOut, price: 1400, rating: 4.6, location: 'Dallas Downtown' }
      ]);
      setIsSearching(false);
    }, 1000);
  };

  const currentFlight = state.flights[0];
  const currentHotel = state.hotels[0];

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Travel & Bookings</h2>
          <p className="text-gray-500">Manage your flights, accommodation, and World Cup match itinerary.</p>
        </div>
        <button onClick={() => onNavigate('chat', 'Help me plan and book my travel to Dallas.')} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm flex items-center">
          <Sparkles size={16} className="mr-2" /> Ask Agent to Book
        </button>
      </div>

      {/* Budget Optimization Alert Banner */}
      {(currentFlight?.price > 1400 || currentHotel?.price > 1000) && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-orange-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-orange-900 text-sm">Budget Optimization Opportunity Detected</h4>
              <p className="text-xs text-orange-800 mt-1">
                Our agents have detected cheaper flight and hotel alternatives for your travel dates. You could save up to $420!
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('chat', 'Analyze my current flight and hotel bookings and find cheaper alternatives for GBE to DFW from June 10 to June 18, 2026.')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center whitespace-nowrap"
          >
            <TrendingDown size={14} className="mr-1.5" />
            Optimize My Budget
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${
            activeTab === 'itinerary' ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar size={16} className="mr-2" />
          Match Itinerary
        </button>
        <button
          onClick={() => setActiveTab('flights')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${
            activeTab === 'flights' ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Plane size={16} className="mr-2" />
          Flights
        </button>
        <button
          onClick={() => setActiveTab('hotels')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${
            activeTab === 'hotels' ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Hotel size={16} className="mr-2" />
          Hotels
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'itinerary' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Calendar size={20} className="mr-2 text-brand-600" /> World Cup Travel Schedule
          </h3>
          <div className="relative border-l-2 border-brand-100 ml-4 space-y-6">
            {state.itineraryEvents.map((event) => (
              <div key={event.id} className="relative pl-6">
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 border-white bg-brand-500 flex items-center justify-center"></div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{event.type}</span>
                    <h4 className="font-bold text-gray-900 text-sm mt-0.5">{event.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xs font-bold text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-lg flex items-center">
                      <Clock size={12} className="mr-1.5 text-gray-400" />
                      {event.date} • {event.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'flights' && (
        <div className="space-y-6">
          {/* Flight Search Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Search size={18} className="mr-2 text-brand-600" /> Search Flights (Fivetran Ingested)
            </h3>
            <form onSubmit={handleFlightSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">From</label>
                <input
                  type="text"
                  value={flightSearch.from}
                  onChange={(e) => setFlightSearch({ ...flightSearch, from: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">To</label>
                <input
                  type="text"
                  value={flightSearch.to}
                  onChange={(e) => setFlightSearch({ ...flightSearch, to: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Departure Date</label>
                <input
                  type="date"
                  value={flightSearch.date}
                  onChange={(e) => setFlightSearch({ ...flightSearch, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-xl text-sm font-bold transition-colors"
                >
                  {isSearching ? 'Searching...' : 'Search Flights'}
                </button>
              </div>
            </form>
          </div>

          {/* Flight Results */}
          {flightResults.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Available Flights</h4>
              <div className="grid grid-cols-1 gap-4">
                {flightResults.map((flight) => (
                  <div key={flight.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                        <Plane size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">{flight.airline}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{flight.flightNumber} • {flight.duration}</p>
                        <p className="text-xs text-gray-400 mt-1">{flight.departure} &rarr; {flight.arrival}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-2xl font-extrabold text-gray-900">${flight.price}</span>
                      <button
                        onClick={() => onNavigate('chat', `Please book this flight for me: Airline: ${flight.airline}, Flight Number: ${flight.flightNumber}, Departure: ${flight.departure}, Arrival: ${flight.arrival}, Price: ${flight.price}. Please execute the BOOK_FLIGHT action immediately.`)}
                        className="mt-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                      >
                        Book via Agent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booked Flights */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle size={18} className="mr-2 text-green-500" /> Booked Flights
            </h3>
            {state.flights.map((flight) => (
              <div key={flight.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{flight.airline} ({flight.flightNumber})</h4>
                  <p className="text-xs text-gray-500 mt-1">{flight.departure} &rarr; {flight.arrival}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                    Booked • ${flight.price}
                  </span>
                  {flight.price > 1400 && (
                    <button 
                      onClick={() => onNavigate('chat', 'Find a cheaper flight alternative for my current booking from GBE to DFW on June 10, 2026.')}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-lg transition-colors"
                    >
                      Find Cheaper Option
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'hotels' && (
        <div className="space-y-6">
          {/* Hotel Search Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Search size={18} className="mr-2 text-brand-600" /> Search Hotels (Elastic Cloud)
            </h3>
            <form onSubmit={handleHotelSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                <input
                  type="text"
                  value={hotelSearch.city}
                  onChange={(e) => setHotelSearch({ ...hotelSearch, city: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Check-In</label>
                <input
                  type="date"
                  value={hotelSearch.checkIn}
                  onChange={(e) => setHotelSearch({ ...hotelSearch, checkIn: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Check-Out</label>
                <input
                  type="date"
                  value={hotelSearch.checkOut}
                  onChange={(e) => setHotelSearch({ ...hotelSearch, checkOut: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-xl text-sm font-bold transition-colors"
                >
                  {isSearching ? 'Searching...' : 'Search Hotels'}
                </button>
              </div>
            </form>
          </div>

          {/* Hotel Results */}
          {hotelResults.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Available Hotels</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hotelResults.map((hotel) => (
                  <div key={hotel.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 text-base line-clamp-1">{hotel.hotelName}</h4>
                        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">★ {hotel.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center mb-4">
                        <MapPin size={12} className="mr-1" /> {hotel.location}
                      </p>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400">Total Price</p>
                        <p className="text-xl font-extrabold text-gray-900">${hotel.price}</p>
                      </div>
                      <button
                        onClick={() => onNavigate('chat', `Please book this hotel for me: Hotel Name: ${hotel.hotelName}, Check-In: ${hotel.checkIn}, Check-Out: ${hotel.checkOut}, Price: ${hotel.price}. Please execute the BOOK_HOTEL action immediately.`)}
                        className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                      >
                        Book via Agent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booked Hotels */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle size={18} className="mr-2 text-green-500" /> Booked Accommodation
            </h3>
            {state.hotels.map((hotel) => (
              <div key={hotel.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{hotel.hotelName}</h4>
                  <p className="text-xs text-gray-500 mt-1">Check-in: {hotel.checkIn} • Check-out: {hotel.checkOut}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                    Booked • ${hotel.price}
                  </span>
                  {hotel.price > 1000 && (
                    <button 
                      onClick={() => onNavigate('chat', 'Find a cheaper hotel alternative for my current booking in Dallas from June 11 to June 18, 2026.')}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-lg transition-colors"
                    >
                      Find Cheaper Option
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
