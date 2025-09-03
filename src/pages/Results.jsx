import React, { useState, useEffect } from 'react';
import Fares from "./../data/fares.json";
import { CalendarDays, Users, MapPin, Clock, ArrowRight, ChevronDown, Star, Filter } from 'lucide-react';

const operators = {
  flights: [
    { id: 1, name: "Kenya Airways", rating: 4.5, logo: "🛩️" },
    { id: 2, name: "Jambojet", rating: 4.2, logo: "✈️" },
    { id: 3, name: "Safarilink", rating: 4.7, logo: "🛫" }
  ],
  buses: [
    { id: 1, name: "Modern Coast", rating: 4.3, logo: "🚌" },
    { id: 2, name: "Easy Coach", rating: 4.0, logo: "🚎" },
    { id: 3, name: "Mash Poa", rating: 4.1, logo: "🚍" }
  ],
  trains: [
    { id: 1, name: "Madaraka Express", rating: 4.6, logo: "🚄" },
    { id: 2, name: "Lunatic Express", rating: 4.4, logo: "🚆" },
    { id: 3, name: "Nairobi Commuter Rail", rating: 4.2, logo: "🚊" }
  ]
};

const routes = {
  flights: [
    { id: 1, from: "Nairobi (NBO)", to: "Mombasa (MBA)", departure: "08:00 AM", arrival: "09:15 AM", duration: "1h 15m", price: 7500, operatorId: 1 },
    { id: 2, from: "Nairobi (NBO)", to: "Kisumu (KIS)", departure: "10:30 AM", arrival: "11:30 AM", duration: "1h 00m", price: 6500, operatorId: 2 },
    { id: 3, from: "Mombasa (MBA)", to: "Malindi (MYD)", departure: "02:15 PM", arrival: "02:45 PM", duration: "30m", price: 4500, operatorId: 3 }
  ],
  buses: [
    { id: 1, from: "Nairobi", to: "Mombasa", departure: "07:00 AM", arrival: "01:30 PM", duration: "6h 30m", price: 1200, operatorId: 1 },
    { id: 2, from: "Nairobi", to: "Kisumu", departure: "08:15 AM", arrival: "02:45 PM", duration: "6h 30m", price: 1100, operatorId: 2 },
    { id: 3, from: "Nairobi", to: "Nakuru", departure: "09:30 AM", arrival: "12:15 PM", duration: "2h 45m", price: 600, operatorId: 3 },
    { id: 4, from: "Nairobi", to: "Eldoret", departure: "08:00 AM", arrival: "01:30 PM", duration: "5h 30m", price: 1000, operatorId: 1 }
  ],
  trains: [
    { id: 1, from: "Nairobi", to: "Mombasa", departure: "08:00 AM", arrival: "02:00 PM", duration: "6h 00m", price: 1000, operatorId: 1 },
    { id: 2, from: "Nairobi", to: "Suswa", departure: "09:15 AM", arrival: "11:00 AM", duration: "1h 45m", price: 300, operatorId: 3 },
    { id: 3, from: "Mombasa", to: "Voi", departure: "07:30 AM", arrival: "09:45 AM", duration: "2h 15m", price: 500, operatorId: 1 }
  ]
};

const kenyanCities = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", 
  "Garissa", "Kakamega", "Nyeri", "Machakos", "Meru", "Lamu", "Voi", "Naivasha", "Nanyuki", "Embu"
];

const TravelBookingSystem = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [fromCity, setFromCity] = useState('Nairobi');
  const [toCity, setToCity] = useState('Mombasa');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter options
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedOperators, setSelectedOperators] = useState([]);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDepartureDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Search function
  const handleSearch = () => {
    let results = routes[activeTab].filter(route => 
      route.from.includes(fromCity) && 
      route.to.includes(toCity) &&
      route.price >= priceRange[0] &&
      route.price <= priceRange[1]
    );

    if (selectedOperators.length > 0) {
      results = results.filter(route => {
        const operator = operators[activeTab].find(op => op.id === route.operatorId);
        return operator && selectedOperators.includes(operator.name);
      });
    }

    // results sort
    results.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

    setSearchResults(results);
    setShowSearchForm(false);
  };

  // Reset search
  const handleReset = () => {
    setFromCity('Nairobi');
    setToCity('Mombasa');
    setSearchResults([]);
    setShowSearchForm(true);
  };

  // Toggle operator filter
  const toggleOperator = (operatorName) => {
    if (selectedOperators.includes(operatorName)) {
      setSelectedOperators(selectedOperators.filter(op => op !== operatorName));
    } else {
      setSelectedOperators([...selectedOperators, operatorName]);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-700 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">TravelLite Booking</h1>
          <p className="opacity-90">Book your flights, buses, and trains</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {['flights', 'buses', 'trains'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 font-semibold transition-all ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => {
                setActiveTab(tab);
                handleReset();
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Form */}
        {showSearchForm && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <div className="relative">
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                  >
                    {kenyanCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <div className="relative">
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                  >
                    {kenyanCities.filter(city => city !== fromCity).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                <div className="relative">
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full">
              <button
                className="h-12 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ml-auto "
                onClick={handleSearch}
              >
                Search {activeTab}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {!showSearchForm && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Results for {fromCity} to {toCity}
              </h2>
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition duration-300"
                onClick={handleReset}
              >
                Modify Search
              </button>
            </div>

            {/* Filters and Sorting */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{formatCurrency(priceRange[0])}</span>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      className="w-full"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    />
                    <span className="text-sm">{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <div className="flex space-x-2">
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="price">Price</option>
                      <option value="departure">Departure Time</option>
                      <option value="duration">Duration</option>
                    </select>
                    <button
                      className="px-3 bg-gray-200 rounded-lg"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Operators</label>
                  <div className="flex flex-wrap gap-2">
                    {operators[activeTab].map(operator => (
                      <button
                        key={operator.id}
                        className={`px-3 py-1 text-sm rounded-full ${selectedOperators.includes(operator.name) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => toggleOperator(operator.name)}
                      >
                        {operator.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {searchResults.length > 0 ? (
                searchResults.map(route => {
                  const operator = operators[activeTab].find(op => op.id === route.operatorId);
                  return (
                    <div key={route.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <div className="text-3xl">{operator.logo}</div>
                          <div>
                            <h3 className="font-semibold text-lg">{operator.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{operator.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 mx-0 md:mx-4 mb-4 md:mb-0">
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <div className="font-semibold">{route.departure}</div>
                              <div className="text-sm text-gray-600">{route.from}</div>
                            </div>
                            
                            <div className="text-center mx-2 md:mx-4">
                              <div className="text-sm text-gray-600">{route.duration}</div>
                              <div className="flex items-center">
                                <div className="h-px bg-gray-300 w-16 md:w-24"></div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div className="font-semibold">{route.arrival}</div>
                              <div className="text-sm text-gray-600">{route.to}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <div className="font-bold text-xl text-blue-600">{formatCurrency(route.price)}</div>
                          <div className="text-sm text-gray-600">per passenger</div>
                          <button className="mt-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">😢</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No routes found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelBookingSystem;