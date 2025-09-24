import { useState, lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner, Services } from "../components";

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
  const [dateError, setDateError] = useState('');
 const [loadingTripId, setLoadingTripId] = useState(null);

  const navigate = useNavigate();

  // Cities data
  const Cities = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", 
    "Garissa", "Kakamega", "Nyeri", "Machakos", "Meru", "Lamu", "Voi", "Naivasha", "Nanyuki", "Embu"
  ];

  // Trip data 
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
        trip.from.toLowerCase().includes(searchFilters.fromCity.toLowerCase()) &&
        trip.to.toLowerCase().includes(searchFilters.toCity.toLowerCase())
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

  // Function to handle trip selection and redirect to booking page
  const handleSelectTrip = (trip) => {
    setLoadingTripId(trip.id);
    
    // trip data for the booking page
    const tripData = {
      id: trip.id,
      fromCity: trip.from,
      toCity: trip.to,
      departureTime: trip.departure,
      arrivalTime: trip.arrival,
      duration: trip.duration,
      price: trip.price,
      transportType: trip.transport,
      company: trip.company,
      amenities: trip.amenities,
      departureDate: departureDate
    };
    
    // Storage for trip data - booking page
    sessionStorage.setItem('selectedTrip', JSON.stringify(tripData));
    
    // Navigation to booking page after delay to show loading state
    setTimeout(() => {
      setLoadingTripId(null);
      navigate('/booking', { state: { trip: tripData }});
    }, 1000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!validateDates()) {
      return;
    }
    
    setIsSearching(true);
    
    // search data
    const searchData = {
      fromCity,
      toCity,
      departureDate: departureDate,
      returnDate: tripType === 'return' ? returnDate : null,
      tripType
    };
    
    // Pass search data to parent
    if (onSearch) {
      onSearch(searchData);
    }
    
    // Storage for search data - results page
    sessionStorage.setItem('searchData', JSON.stringify(searchData));
    
    // search filters to show results
    setSearchFilters({
      fromCity,
      toCity
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
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white pb-12 pt-6">
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
                  className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg
                   bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 
                  text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 
                  transition-all shadow-md hover:shadow-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
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
          </div>
        </div>
      </div>
     
      {/* Available Trips Section - popular trips - no search made */}
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
                  
                </div>
                
                <button 
                  onClick={() =>handleSelectTrip(trip)} 
                  disabled={loadingTripId === trip.id}
                  className={`w-full py-2.5 rounded-lg font-medium transition-col
                  ors flex items-center justify-center ${
                    loadingTripId === trip.id
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {loadingTripId === trip.id ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </div>
                  ) : 'Book Now'}
                </button>
            </div>
            ))}
          </div>
        </section>
      )}

      {/* Show search results */}
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
                          disabled={isSearching}
                        >
                          {isSearching ? 'Loading...' : 'Book Now'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <div className="text-gray-500 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
                  <p className="text-gray-500 mb-4">We couldn't find any trips matching your search criteria.</p>
                  <button
                    onClick={() => setSearchFilters({})}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try a different search
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