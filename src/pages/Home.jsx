import { useState, lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from '../components/HeroCarousel';
import { LoadingSpinner, Services } from "../components";

const LazyTestimonials = lazy(() => import('../components/Testimonials'));

const Home = ({ onSearch }) => {
  // component logic
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
      transport: "train"
    }
  ];

  // Fetching trips from API
  const fetchTrips = async (searchParams) => {
    // API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return getFallbackTrips(searchParams);
  };

  const getFallbackTrips = (searchParams) => {
    // Filtering Trips - Search Filters
    return popularTrips.filter(trip => 
      trip.from.toLowerCase().includes(searchParams.fromCity.toLowerCase()) &&
      trip.to.toLowerCase().includes(searchParams.toCity.toLowerCase())
    );
  };

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

  // Handle trip selection and redirect to booking page
  const handleSelectTrip = (trip) => {
    setLoadingTripId(trip.id);
    
    // Trip data for the booking page
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

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!validateDates()) {
      return;
    }
    
    setIsSearching(true);
    
    // Search data
    const searchData = {
      fromCity,
      toCity,
      departureDate: departureDate,
      returnDate: tripType === 'return' ? returnDate : null,
      tripType
    };
    
    try {
      const trips = await fetchTrips(searchData);
    
      // Pass search data to parent 
      if (onSearch) {
        onSearch(searchData, trips);
      }
      
      // Storage for search data - results page
      sessionStorage.setItem('searchData', JSON.stringify(searchData));
      sessionStorage.setItem('searchResults', JSON.stringify(trips));
      
      // Navigate to results page 
      setTimeout(() => {
        setIsSearching(false);
        navigate('/results', { 
          state: { 
            searchData: searchData,
            trips: trips
          }
        });
      }, 1000);
      
    } catch (error) {
      console.error('Search failed:', error);
      setIsSearching(false);
    }
  };

  // Default departure set to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDepartureDate(tomorrow.toISOString().split('T')[0]);
    setIsInitialLoading(false);
  }, []);

  // return date for round trips
  useEffect(() => {
    if (tripType === 'return' && departureDate && !returnDate) {
      const depDate = new Date(departureDate);
      depDate.setDate(depDate.getDate() + 2); 
      setReturnDate(depDate.toISOString().split('T')[0]);
    }
  }, [departureDate, tripType, returnDate]);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <LoadingSpinner size="large" text="Loading TravelLite..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px]">
        {/* Background Carousel */}
        <HeroCarousel />
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-300 drop-shadow-lg mb-4">
            TravelLite
          </h1>
          <p className="text-lg md:text-xl text-white drop-shadow-md mb-8 max-w-2xl">
            Seamless bus, train, and flight bookings at your fingertips
          </p>
        </div>
      </section>

      {/* Search Form Section - BELOW Hero Section */}
      <section className="relative -mt-16 z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200">
            <div className="flex space-x-4 mb-6">
              <button 
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  tripType === 'one-way' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setTripType('one-way')}
              >
                One-way
              </button>
              <button 
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  tripType === 'return' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setTripType('return')}
              >
                Return
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-4">
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
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 
                  text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 
                  transition-all shadow-lg hover:shadow-xl font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </div>
                  ) : 'Search'}
                </button>
              </div>
            </form>
            
            {dateError && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                {dateError}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Available Trips - no search made */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Trips in Kenya</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover the most sought-after routes across the country</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTrips.map(trip => (
            <div key={trip.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
              </div>
              
              <button 
                onClick={() => handleSelectTrip(trip)} 
                disabled={loadingTripId === trip.id}
                className={`w-full py-3 font-medium transition-colors flex items-center justify-center ${
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