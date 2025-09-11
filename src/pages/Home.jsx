import { LoadingSpinner, Services, TopSearch } from "../components";
import { useState, lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LazyTestimonials = lazy(() => import('../components/Testimonials'));

const Home = ({ onSearch }) => {
  const [searchFilters, setSearchFilters] = useState({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [tripType, setTripType] = useState('one-way');
  const [fromCity, setFromCity] = useState('Nairobi');
  const [toCity, setToCity] = useState('Mombasa');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [transportType, setTransportType] = useState('all');
  const [dateError, setDateError] = useState('');

  const navigate = useNavigate();

  const Cities = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", 
    "Garissa", "Kakamega", "Nyeri", "Machakos", "Meru", "Lamu", "Voi", "Naivasha", "Nanyuki", "Embu"
  ];

  const popularTrips = [
    {
      id: 1,
      company: "Modern Coast",
      from: "Nairobi",
      to: "Mombasa",
      departure: "08:00",
      arrival: "14:00",
      duration: "6h",
      price: "KSh 1,500",
      amenities: ["WiFi", "Refreshments", "AC"],
      transport: "bus"
    },
    {
      id: 2,
      company: "Easy Coach",
      from: "Nairobi",
      to: "Kisumu",
      departure: "09:00",
      arrival: "15:30",
      duration: "6h 30m",
      price: "KSh 1,200",
      amenities: ["WiFi", "Charging Ports", "AC"],
      transport: "bus"
    },
    {
      id: 3,
      company: "Madaraka Express",
      from: "Nairobi",
      to: "Mombasa",
      departure: "08:00",
      arrival: "14:00",
      duration: "6h",
      price: "KSh 1,000",
      amenities: ["Dining", "Comfortable Seats", "Scenic Views"],
      transport: "train"
    },
    {
      id: 4,
      company: "Kenya Airways",
      from: "Nairobi (NBO)",
      to: "Mombasa (MBA)",
      departure: "07:30",
      arrival: "08:45",
      duration: "1h 15m",
      price: "KSh 7,500",
      amenities: ["In-flight Service", "Quick Travel", "Priority Boarding"],
      transport: "flight"
    },
    {
      id: 5,
      company: "Jumbo Jet",
      from: "Nairobi (NBO)",
      to: "Isiolo (MBA)",
      departure: "08:30",
      arrival: "09:45",
      duration: "1h 15m",
      price: "KSh 6,500",
      amenities: ["In-flight Service", "Quick Travel", "Priority Boarding"],
      transport: "flight"
    },
    {
      id: 6,
      company: "Lunatic Express",
      from: "Kisii",
      to: "Nairobi",
      departure: "08:30",
      arrival: "14:45",
      duration: "5h",
      price: "KSh 3,500",
      amenities: ["comfortable seats", "Quick Travel", "Express"],
      transport: "Train"
    }
  ];

  // Filtering Trips - Search Filters
  const filteredTrips = searchFilters.fromCity 
    ? popularTrips.filter(trip => 
        trip.from.includes(searchFilters.fromCity) &&
        trip.to.includes(searchFilters.toCity) &&
        (searchFilters.transportType === 'all' || trip.transport === searchFilters.transportType)
      )
    : popularTrips;

  const validateDates = () => {
    if (tripType === 'return' && returnDate && departureDate) {
      const depDate = new Date(departureDate);
      const retDate = new Date(returnDate);
      
      if (retDate <= depDate) {
        setDateError('Return date must be after departure date');
        return false;
      }
    }
    setDateError('');
    return true;
  };

  // Function to handle trip selection and redirect
  const handleSelectTrip = (trip) => {
    setIsSearching(true);
    
    // Prepare trip data for the bus list page
    const tripData = {
      fromCity: trip.from,
      toCity: trip.to,
      departureDate: departureDate,
      transportType: trip.transport,
      company: trip.company
    };
    
    // Store trip data for the bus list page
    sessionStorage.setItem('tripData', JSON.stringify(tripData));
    
    // Navigate after a short delay to show loading state
    setTimeout(() => {
      setIsSearching(false);
      navigate('/bus-list');
    }, 1000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!validateDates()) {
      return;
    }
    
    setIsSearching(true);
    
    // Prepare search data
    const searchData = {
      fromCity,
      toCity,
      departureDate: departureDate,
      returnDate: tripType === 'return' ? returnDate : null,
      passengers,
      transportType,
      tripType
    };
    
    // Pass search data to parent component (App.jsx)
    if (onSearch) {
      onSearch(searchData);
    }
    
    // Store search data for results page
    sessionStorage.setItem('searchData', JSON.stringify(searchData));
    
    // Set search filters to show results
    setSearchFilters({
      fromCity,
      toCity,
      transportType
    });
    
    // Reset searching state after a delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  // default departure set to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDepartureDate(tomorrow.toISOString().split('T')[0]);
    setIsInitialLoading(false);
  }, []);

  // Update return date when departure date changes for round trips
  useEffect(() => {
    if (tripType === 'return' && departureDate && !returnDate) {
      const depDate = new Date(departureDate);
      depDate.setDate(depDate.getDate() + 2); // Default return after 2 days
      setReturnDate(depDate.toISOString().split('T')[0]);
    }
  }, [departureDate, tripType, returnDate]);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" text="Loading TravelLite..." />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-700 to-blue-900 text-white pb-12 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl opacity-95">
              Compare prices and book buses, trains, and flights across Kenya
            </p>
          </div>
          
          {/* Search Form in Hero */}
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-5xl mx-auto border border-gray-100">
            <div className="flex space-x-4 mb-6">
              <button 
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  tripType === 'one-way' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setTripType('one-way')}
              >
                One-way
              </button>
              <button 
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  tripType === 'return' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setTripType('return')}
              >
                Return
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">From</label>
                <select
                  className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  required
                >
                  {Cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">To</label>
                <select
                  className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  required
                >
                  {Cities.filter(city => city !== fromCity).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Depart</label>
                <input
                  type="date"
                  className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              {tripType === 'return' && (
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Return</label>
                  <input
                    type="date"
                    className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate}
                    required
                  />
                </div>
              )}
              
              <div className="md:col-span-1 flex items-end">
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
            
            {dateError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {dateError}
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center">
                <label className="text-sm font-semibold text-gray-800 mr-3">Transport:</label>
                <select 
                  className="border border-gray-300 text-gray-800 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="bus">Buses</option>
                  <option value="train">Trains</option>
                  <option value="flight">Flights</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="text-sm font-semibold text-gray-800 mr-3">Passengers:</label>
                <select 
                  className="border border-gray-300  text-gray-800 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Available Trips Section - popular trips when no search has been made */}
      {!searchFilters.fromCity && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Popular Trips</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTrips.map(trip => (
              <div key={trip.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{trip.company}</h3>
                      <p className="text-sm text-gray-500 capitalize">{trip.transport}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                      {trip.price}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{trip.departure}</p>
                      <p className="text-sm text-gray-600">{trip.from}</p>
                    </div>
                    <div className="text-center flex flex-col items-center">
                      <p className="text-sm text-gray-500">{trip.duration}</p>
                      <div className="w-16 h-px bg-gray-600 my-2"></div>
                      <p className="text-xs text-gray-500">Direct</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{trip.arrival}</p>
                      <p className="text-sm text-gray-600">{trip.to}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.amenities.map((amenity, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => handleSelectTrip(trip)}
                    disabled={isSearching}
                  >
                    {isSearching ? 'Loading...' : 'Select This Trip'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Show search results when a search has been made */}
      {searchFilters.fromCity && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Search Results for {searchFilters.fromCity} to {searchFilters.toCity}
            </h2>
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => setSearchFilters({})}
            >
              Clear Search
            </button>
          </div>
          
          {isSearching ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="medium" text="Searching for trips..." />
            </div>
          ) : (
            <>
              {filteredTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrips.map(trip => (
                    <div key={trip.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{trip.company}</h3>
                            <p className="text-sm text-gray-500 capitalize">{trip.transport}</p>
                          </div>
                          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                            {trip.price}
                          </span>
                        </div>
                        
                        <div className="flex justify-between mb-4">
                          <div>
                            <p className="text-lg font-bold text-gray-900">{trip.departure}</p>
                            <p className="text-sm text-gray-600">{trip.from}</p>
                          </div>
                          <div className="text-center flex flex-col items-center">
                            <p className="text-sm text-gray-500">{trip.duration}</p>
                            <div className="w-16 h-px bg-gray-600 my-2"></div>
                            <p className="text-xs text-gray-500">Direct</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{trip.arrival}</p>
                            <p className="text-sm text-gray-600">{trip.to}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {trip.amenities.map((amenity, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        
                        <button 
                          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          onClick={() => handleSelectTrip(trip)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <div className="text-5xl mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No trips found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setSearchFilters({})}
                  >
                    Start New Search
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

     {/* Services Section */}
      <section aria-labelledby="services-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <Services />
      </section>

      {/* Top Search Section */}
      <section aria-labelledby="top-search-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TopSearch onSelectDestination={(destination) => setToCity(destination)} />
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={
          <div className="bg-white rounded-lg shadow p-8 flex items-center justify-center">
            <LoadingSpinner text="Loading testimonials..." />
          </div>
        }>
          <div className="bg-white rounded-lg shadow p-6">
            <LazyTestimonials />
          </div>
        </Suspense>
      </section>
    </div>
  );
};

export default Home;