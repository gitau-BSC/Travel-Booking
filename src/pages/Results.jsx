import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import BookingList from '../components/BookingList';

// Error Boundary Component
class ResultsErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Results component error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
              <p className="text-gray-600 mb-6">
                We encountered an error while loading your search results.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Go to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const sampleBusBookings = [
  {
    id: 1,
    type: "Tahmeed bus",
    company: "Tahmeed",
    route: "Nairobi to Mombasa",
    price: 1800,
    departure: "08:00",
    arrival: "14:00",
    seatsAvailable: 24,
    image: "/images/Tahmeed.jpg",
    schedule: {
      departure_time: "08:00",
      arrival_time: "14:00",
      origin: "Nairobi",
      destination: "Mombasa",
      seat_map: {
        seats: [
          { number: "1A", is_available: true, class: "premium", position: "window" },
          { number: "1B", is_available: true, class: "premium", position: "aisle" },
          { number: "2A", is_available: false, class: "premium", position: "window" },
          { number: "2B", is_available: true, class: "premium", position: "aisle" },
        ]
      }
    }
  },
  {
    id: 2,
    type: "bus",
    company: "Easy Coach",
    route: "Nairobi to Kakamega",
    price: 2200,
    departure: "10:00",
    arrival: "18:00",
    seatsAvailable: 12,
    image: "/images/Easycoach2.jpg",
    rating: 4.2,
    amenities: ["Wi-Fi", "AC", "Extra Legroom"],
    schedule: {
      departure_time: "10:00",
      arrival_time: "16:00",
      origin: "Nairobi",
      destination: "Mombasa",
      seat_map: {
        seats: [
          { number: "1A", is_available: true, class: "premium", position: "window" },
          { number: "1B", is_available: true, class: "premium", position: "aisle" },
          { number: "2A", is_available: false, class: "premium", position: "window" },
          { number: "2B", is_available: true, class: "premium", position: "aisle" },
        ]
      }
    }
  },
  {
    id: 3,
    type: "shuttle",
    company: "Prestige",
    route: "Nairobi to Kisumu",
    price: 2000,
    departure: "07:30",
    arrival: "12:00",
    seatsAvailable: 8,
    image: "/images/presige.jpg",
    rating: 4.7,
    amenities: ["AC", "Charging Ports"],
    schedule: {
      departure_time: "07:30",
      arrival_time: "13:00",
      origin: "Nairobi",
      destination: "Kisumu",
      seat_map: {
        seats: [
          { number: "1A", is_available: true, class: "standard", position: "window" },
          { number: "1B", is_available: true, class: "standard", position: "aisle" },
          { number: "2A", is_available: true, class: "standard", position: "window" },
          { number: "2B", is_available: false, class: "standard", position: "aisle" },
        ]
      }
    }
  },
  {
    id: 4,
    type: "shuttle",
    company: "The Guardian",
    route: "Nairobi to Eldoret",
    price: 1300,
    departure: "10:30",
    arrival: "16:00",
    seatsAvailable: 8,
    image: "/images/Guardian.jpg",
    rating: 4.7,
    amenities: ["AC", "Charging Ports"],
    schedule: {
      departure_time: "07:30",
      arrival_time: "12:00",
      origin: "Nairobi",
      destination: "Kisumu",
      seat_map: {
        seats: [
          { number: "1A", is_available: true, class: "standard", position: "window" },
          { number: "1B", is_available: true, class: "standard", position: "aisle" },
          { number: "2A", is_available: true, class: "standard", position: "window" },
          { number: "2B", is_available: false, class: "standard", position: "aisle" },
        ]
      }
    }
  },
  {
    id: 5,
    type: "luxury bus",
    company: "Modern Coast",
    route: "Nairobi to Malindi",
    price: 2500,
    departure: "09:30",
    arrival: "15:30",
    seatsAvailable: 18,
    image: "/images/ModernCoast.jpg",
    rating: 4.8,
    amenities: ["Wi-Fi", "AC", "Charging Ports", "Entertainment", "Meals"],
    schedule: {
      departure_time: "09:30",
      arrival_time: "18:30",
      origin: "Nairobi",
      destination: "Mombasa",
      seat_map: {
        seats: [
          { number: "1A", is_available: true, class: "premium", position: "window" },
          { number: "1B", is_available: true, class: "premium", position: "aisle" },
          { number: "2A", is_available: false, class: "premium", position: "window" },
          { number: "2B", is_available: true, class: "premium", position: "aisle" },
        ]
      }
    }
  },
  {
    id: 6,
    type: "train",
    company: "Madaraka Express",
    route: "Nairobi to Mombasa",
    price: 3000,
    departure: "08:00",
    arrival: "14:30",
    seatsAvailable: 42,
    image: "/images/Madaraka express.jpg",
    rating: 4.9,
    amenities: ["Wi-Fi", "AC", "Dining Car", "Spacious Seats", "Power Outlets", "Scenic Views"],
    schedule: {
      departure_time: "08:00",
      arrival_time: "14:30",
      origin: "Nairobi",
      destination: "Mombasa",
      seat_map: {
        seats: [
          { number: "1A", is_available: true, class: "first", position: "window" },
          { number: "1B", is_available: true, class: "first", position: "aisle" },
          { number: "2A", is_available: false, class: "first", position: "window" },
          { number: "2B", is_available: true, class: "first", position: "aisle" },
        ]
      }
    }
  },
  {
    id: 7,
    type: "airline",
    company: "Kenya Airways",
    route: "Nairobi to Mombasa",
    price: 7500,
    departure: "07:15",
    arrival: "08:15",
    seatsAvailable: 32,
    image: "/images/Kenyaair.jpg",
    rating: 4.6,
    amenities: ["In-flight Entertainment", "Meals", "Priority Boarding", "Extra Legroom", "Business Class"],
    schedule: {
      departure_time: "07:15",
      arrival_time: "08:15",
      origin: "Nairobi (JKIA)",
      destination: "Mombasa (MBA)",
      seat_map: {
        seats: [
          { number: "1A", is_available: true, class: "business", position: "window" },
          { number: "1B", is_available: true, class: "business", position: "aisle" },
          { number: "2A", is_available: false, class: "economy", position: "window" },
          { number: "2B", is_available: true, class: "economy", position: "aisle" },
        ]
      }
    }
  },
  {
    id: 8,
    type: "airline",
    company: "Jumbojet",
    route: "Nairobi to Kisumu",
    price: 5200,
    departure: "10:45",
    arrival: "11:40",
    seatsAvailable: 28,
    image: "/images/jumbojet.jpg",
    rating: 4.3,
    amenities: ["AC", "Snacks", "On-time Guarantee", "Friendly Staff"],
    schedule: {
      departure_time: "10:45",
      arrival_time: "11:40",
      origin: "Nairobi (Wilson)",
      destination: "Kisumu (KIS)",
      seat_map: {
        seats: [
          { number: "1A", is_available: true, class: "economy", position: "window" },
          { number: "1B", is_available: true, class: "economy", position: "aisle" },
          { number: "2A", is_available: false, class: "economy", position: "window" },
          { number: "2B", is_available: true, class: "economy", position: "aisle" },
        ]
      }
    }
  },
  {
    id: 9,
    type: "train",
    company: "Lunatic Express",
    route: "Nairobi to Kisumu",
    price: 1500,
    departure: "19:00",
    arrival: "09:00+1",
    seatsAvailable: 16,
    image: "/images/LunaticExpress.jpg",
    rating: 4.0,
    amenities: ["Sleeper Cabins", "Dining Car", "Historic Experience", "Observation Deck"],
    schedule: {
      departure_time: "19:00",
      arrival_time: "09:00",
      origin: "Nairobi",
      destination: "Mombasa",
      seat_map: {
        seats: [
          { number: "1A", is_available: true, class: "sleeper", position: "window" },
          { number: "1B", is_available: true, class: "sleeper", position: "aisle" },
          { number: "2A", is_available: false, class: "sleeper", position: "window" },
          { number: "2B", is_available: true, class: "sleeper", position: "aisle" },
        ]
      }
    }
  }
];

// API configuration
const API_TOKEN = "66Shf2aP.owT6xw6QKSWNO9EeQIIlz20JM3nNHul3";

// Static cities 
const staticCities = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", 
  "Garissa", "Kakamega", "Nyeri", "Machakos", "Meru", "Lamu", "Voi", "Naivasha", "Nanyuki", "Embu"
];

// Results Component
const ResultsComponent = ({ searchData }) => {
  const [activeTab, setActiveTab] = useState('buses'); 
  const [fromCity, setFromCity] = useState('Nairobi');
  const [toCity, setToCity] = useState('Mombasa');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [cities, setCities] = useState([]);
  
  const navigate = useNavigate();

  // Filter options
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedOperators, setSelectedOperators] = useState([]);

  // unique operators from sample data
  const allOperators = [...new Set(sampleBusBookings.map(booking => booking.company))];

  // CITIES Fetch
  const fetchCities = useCallback(async () => {
    try {
      setCitiesLoading(true);
      console.log('Fetching cities from API...');
      
      const response = await fetch(
        "https://dev.marketplaceapi.buupass.com/marketplace/cities",
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      console.log('Cities API response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Cities API response data:', data);
      
      if (data && data.data && data.data.cities) {
        // Extraction and flattening of cities from operators
        const allCities = [];
        const cityMap = new Map();
        
        // Handling city data structures
        Object.values(data.data.cities).forEach(operatorCities => {
          if (Array.isArray(operatorCities)) {
            operatorCities.forEach(city => {
              if (city && city.id && !cityMap.has(city.id)) {
                cityMap.set(city.id, true);
                allCities.push({
                  id: city.id,
                  name: city.name || 'Unknown City',
                  alias: city.alias || (city.name ? city.name.toLowerCase().replace(/\s+/g, '-') : 'unknown')
                });
              }
            });
          }
        });

        console.log('Processed cities:', allCities);
        if (allCities.length > 0) {
          setCities(allCities);
        } else {
          // Fallback to static cities if API returns empty
          setCities(staticCities.map((name, index) => ({ id: index + 1, name, alias: name.toLowerCase() })));
        }
      } else {
        throw new Error('Invalid cities data structure from API');
      }
    } catch (err) {
      console.error("Error fetching cities:", err);
      // Fallback to static cities on error
      setCities(staticCities.map((name, index) => ({ id: index + 1, name, alias: name.toLowerCase() })));
      setError('Using fallback cities data due to API error');
    } finally {
      setCitiesLoading(false);
    }
  }, []);

  // Bus Schedules fetch
  const fetchBusSchedules = useCallback(async (from, to, date) => {
    if (!from || !to) {
      console.log('Missing required parameters for schedules API');
      return [];
    }

    try {
      setSchedulesLoading(true);
      
      // Date formatting
      const formattedDate = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      
      console.log('Fetching schedules for:', from, 'to', to, 'on', formattedDate);
      
      // API call for schedules
      const url = `https://dev.marketplaceapi.buupass.com/marketplace/buses/stream-schedules?leaving_from=${encodeURIComponent(from)}&going_to=${encodeURIComponent(to)}&departing_on=${formattedDate}`;
      
      console.log('Schedules API URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Schedules API response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Schedules API response data:', data);

      let schedules = [];

      // response formats handling
      if (data && Array.isArray(data)) {
        schedules = data;
      } else if (data && data.schedules && Array.isArray(data.schedules)) {
        schedules = data.schedules;
      } else if (data && data.data && Array.isArray(data.data)) {
        schedules = data.data;
      }

      console.log('Extracted schedules:', schedules);
      return schedules;

    } catch (err) {
      console.error('Error fetching bus schedules:', err);
      setError('Failed to fetch real-time schedules. Showing sample data instead.');
      return [];
    } finally {
      setSchedulesLoading(false);
    }
  }, []);

  // Api schedules
  const transformApiSchedules = useCallback((apiSchedules) => {
    return apiSchedules.map((schedule, index) => {
      // unique ID
      const scheduleId = schedule.id || `api-${index}-${Date.now()}`;
      
      // Get operator name 
      const operatorName = schedule.operator?.name || 
                          schedule.operator_name || 
                          schedule.company || 
                          'Unknown Operator';
      
      // Get origin and destination 
      const originName = schedule.origin?.name || schedule.origin_name || schedule.origin || 'Unknown Origin';
      const destinationName = schedule.destination?.name || schedule.destination_name || schedule.destination || 'Unknown Destination';
      
      // Get price 
      const priceAmount = schedule.price?.amount || 
                         schedule.price?.value || 
                         schedule.fare || 
                         schedule.price || 
                         0;

      return {
        id: scheduleId,
        type: "bus",
        company: operatorName,
        route: `${originName} to ${destinationName}`,
        price: priceAmount,
        departure: schedule.departure_time || '08:00',
        arrival: schedule.arrival_time || '14:00',
        seatsAvailable: schedule.available_seats || schedule.seats_available || 10,
        image: "/images/bus-default.jpg",
        rating: 4.0,
        amenities: schedule.amenities || ["AC", "Comfortable Seats"],
        schedule: {
          departure_time: schedule.departure_time,
          arrival_time: schedule.arrival_time,
          origin: originName,
          destination: destinationName,
          seat_map: schedule.seat_map || { seats: [] }
        },
        isFromApi: true
      };
    });
  }, []);

  // Get search data from props/sessionStorage
  const getSearchData = useCallback(() => {
    try {
      if (searchData) {
        return searchData;
      }
      
      // Get from sessionStorage 
      const storedData = sessionStorage.getItem('searchData');
      return storedData ? JSON.parse(storedData) : null;
    } catch (err) {
      console.error('Error parsing search data:', err);
      setError('Failed to load search data. Please try your search again.');
      return null;
    }
  }, [searchData]);

  // Route filtering function 
  const doesRouteMatch = useCallback((route, from, to) => {
    if (!route || !from || !to) return false;
    
    const routeLower = route.toLowerCase();
    const fromLower = from.toLowerCase();
    const toLower = to.toLowerCase();
    
    const routeParts = routeLower.split(' to ');
    
    if (routeParts.length !== 2) return false;
    
    const routeFrom = routeParts[0].trim();
    const routeTo = routeParts[1].trim();
    
    return routeFrom.includes(fromLower) && routeTo.includes(toLower);
  }, []);

  // Helper function to convert time string to minutes
  const convertTimeToMinutes = useCallback((timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }, []);

  // Search function 
  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let results = [];
      let apiResults = [];

      // Fetch for real schedules from API 
      if (activeTab === 'buses' && fromCity && toCity) {
        console.log('Fetching real schedules from API...');
        apiResults = await fetchBusSchedules(fromCity, toCity, departureDate);
        
        if (apiResults.length > 0) {
          const transformedApiResults = transformApiSchedules(apiResults);
          results = [...transformedApiResults];
          console.log('API results found:', results.length);
        }
      }

      console.log('Filtering sample data for:', fromCity, 'to', toCity);
      
      const filteredSample = sampleBusBookings.filter(booking => 
        doesRouteMatch(booking.route, fromCity, toCity) &&
        booking.price >= priceRange[0] &&
        booking.price <= priceRange[1]
      );

      console.log('Filtered sample results:', filteredSample.length);

      // API and Sample data
      const sampleIds = new Set(filteredSample.map(b => b.id));
      const uniqueApiResults = results.filter(apiResult => !sampleIds.has(apiResult.id));
      
      results = [...filteredSample, ...uniqueApiResults];

      // Apply operator filter 
      if (selectedOperators.length > 0) {
        results = results.filter(booking => 
          selectedOperators.includes(booking.company)
        );
      }

      // Sort results
      const calculateDuration = (departure, arrival) => {
        if (!departure || !arrival) return 0;
        const depMinutes = convertTimeToMinutes(departure);
        const arrMinutes = convertTimeToMinutes(arrival);
        if (arrMinutes < depMinutes) {
          return (24 * 60 - depMinutes) + arrMinutes;
        }
        return arrMinutes - depMinutes;
      };

      results.sort((a, b) => {
        let aValue, bValue;
        
        if (sortBy === 'departure') {
          aValue = convertTimeToMinutes(a.departure);
          bValue = convertTimeToMinutes(b.departure);
        } else if (sortBy === 'duration') {
          aValue = calculateDuration(a.departure, a.arrival);
          bValue = calculateDuration(b.departure, b.arrival);
        } else {
          aValue = a.price || 0;
          bValue = b.price || 0;
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setSearchResults(results);
      setInitialLoad(false);
      
      if (results.length === 0) {
        setError('No trips found for your search criteria. Try different cities or dates.');
      }
      
    } catch (err) {
      console.error('Error in search:', err);
      setError('An error occurred while searching. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [
    activeTab, fromCity, toCity, departureDate, priceRange, selectedOperators, 
    sortBy, sortOrder, fetchBusSchedules, transformApiSchedules, 
    doesRouteMatch, convertTimeToMinutes
  ]);

  // Initializes cities on component mount
  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  // Initializes search 
  useEffect(() => {
    const initializeSearch = async () => {
      try {
        const currentSearchData = getSearchData();
        
        if (currentSearchData) {
          console.log('Initializing with search data:', currentSearchData);
          
          setActiveTab(currentSearchData.transportType || 'buses');

          if (currentSearchData.fromCity) {
            setFromCity(currentSearchData.fromCity);
          }
          if (currentSearchData.toCity) {
            setToCity(currentSearchData.toCity);
          }
          
          setPassengers(currentSearchData.passengers || 1);
          setDepartureDate(currentSearchData.departureDate || '');

          // state update, then search
          setTimeout(() => {
            handleSearch();
            setInitialLoad(false);
          }, 100);
        } else {
          console.log('No search data found, redirecting to home');
          const timer = setTimeout(() => {
            navigate('/');
          }, 2000);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error('Error in useEffect:', err);
        setError('Failed to initialize search. Please try again.');
        setLoading(false);
      }
    };

    initializeSearch();
  }, [getSearchData, navigate, handleSearch]);

  // Handle filter changes
  useEffect(() => {
    if (!initialLoad) {
      handleSearch();
    }
  }, [fromCity, toCity, activeTab, priceRange, selectedOperators, sortBy, sortOrder, handleSearch, initialLoad]);

  // Handle new search from results page
  const handleNewSearch = () => {
    setError(null); 
    handleSearch();
  };

  // Reset search
  const handleReset = () => {
    navigate('/');
  };

  // Toggle operator filter
  const toggleOperator = (operatorName) => {
    if (selectedOperators.includes(operatorName)) {
      setSelectedOperators(selectedOperators.filter(op => op !== operatorName));
    } else {
      setSelectedOperators([...selectedOperators, operatorName]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedOperators([]);
    setSortBy('price');
    setSortOrder('asc');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  // Get button text loading states
  const getButtonText = () => {
    if (loading) return 'Searching...';
    if (citiesLoading) return 'Loading Cities...';
    if (schedulesLoading) return 'Fetching Schedules...';
    return 'Update Search';
  };

  // cities array for dropdowns
  const citiesArray = cities.length > 0 ? cities.map(city => city.name) : staticCities;

  // loading state
  if ((citiesLoading || schedulesLoading) && initialLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {schedulesLoading ? 'Fetching real-time schedules...' : 'Loading cities data...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error message
  if (error && !searchResults.length && initialLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={handleReset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const currentSearchData = getSearchData();
  if (!currentSearchData && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No search data found</h3>
          <p className="text-gray-600">Redirecting you to the home page...</p>
        </div>
      </div>
    );
  }

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
                setSelectedOperators([]);
                setSearchResults([]);
                setTimeout(handleSearch, 100);
              }}
              disabled={citiesLoading}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Results for {fromCity} to {toCity}
            </h2>
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition duration-300"
              onClick={handleReset}
            >
              New Search
            </button>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  disabled={citiesLoading}
                >
                  {citiesArray.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {citiesLoading && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  disabled={citiesLoading}
                >
                  {citiesArray.filter(city => city !== fromCity).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {citiesLoading && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
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

            <div className="flex items-end">
              <button
                className="w-full h-12 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNewSearch}
                disabled={loading || citiesLoading || schedulesLoading}
              >
                {getButtonText()}
              </button>
            </div>
          </div>

          {/* Filters and Sorting */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    className="w-full"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], parseInt(e.target.value)]);
                    }}
                  />
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
                    aria-label={sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operators</label>
                <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                  {activeTab === 'buses' && allOperators.map(operator => (
                    <button
                      key={operator}
                      className={`px-3 py-1 text-sm rounded-full ${selectedOperators.includes(operator) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      onClick={() => toggleOperator(operator)}
                    >
                      {operator}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <p className="text-yellow-700">{error}</p>
              </div>
            </div>
          )}

          {/* No results message */}
          {!error && !loading && searchResults.length === 0 && (
            <div className="text-center py-8 bg-yellow-50 rounded-lg">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No trips found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching for trips...</p>
            </div>
          )}

          {/* Results List */}
          {!loading && searchResults.length > 0 && (
            <div className="space-y-4">
              {activeTab === 'buses' ? (
                <BookingList bookings={searchResults} />
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} booking coming soon
                  </h3>
                  <p className="text-gray-600">We're working on adding {activeTab} booking functionality.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Component under Error Boundary
const Results = (props) => (
  <ResultsErrorBoundary>
    <ResultsComponent {...props} />
  </ResultsErrorBoundary>
);

export default Results;