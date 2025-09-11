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

// Sample data for buses (compatible with BookingList component)
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
    route: "Nairobi to Mombasa",
    price: 1800,
    departure: "08:00",
    arrival: "14:00",
    seatsAvailable: 24,
    image: "/images/Easycoach2.jpg",
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
    id: 3,
    type: "shuttle",
    company: "Dreamline",
    route: "Nairobi to Kisumu",
    price: 1200,
    departure: "07:30",
    arrival: "12:00",
    seatsAvailable: 14,
    image: "/images/Dreamline.jpg",
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
  }
];

const Cities = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", 
  "Garissa", "Kakamega", "Nyeri", "Machakos", "Meru", "Lamu", "Voi", "Naivasha", "Nanyuki", "Embu"
];

// Results Component
const ResultsComponent = ({ searchData }) => {
  const [activeTab, setActiveTab] = useState('buses'); // Default to buses for BookingList compatibility
  const [fromCity, setFromCity] = useState('Nairobi');
  const [toCity, setToCity] = useState('Mombasa');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  
  const navigate = useNavigate();

  // Filter options
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedOperators, setSelectedOperators] = useState([]);

  // Get search data from props or sessionStorage
  const getSearchData = useCallback(() => {
    try {
      if (searchData) {
        return searchData;
      }
      
      // get sessionStorage if not in props
      const storedData = sessionStorage.getItem('searchData');
      return storedData ? JSON.parse(storedData) : null;
    } catch (err) {
      console.error('Error parsing search data:', err);
      setError('Failed to load search data. Please try your search again.');
      return null;
    }
  }, [searchData]);

  // Search function
  const handleSearch = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulating API call delay
    setTimeout(() => {
      try {
        // For buses tab, use the sample bus data that's compatible with BookingList
        let results = [];
        
        if (activeTab === 'buses') {
          results = sampleBusBookings.filter(booking => 
            booking.route.includes(fromCity) && 
            booking.route.includes(toCity) &&
            booking.price >= priceRange[0] &&
            booking.price <= priceRange[1]
          );

          if (selectedOperators.length > 0) {
            results = results.filter(booking => 
              selectedOperators.includes(booking.company)
            );
          }
        } else {
          // For flights and trains, use the original logic (though BookingList won't be used)
          results = [];
        }

        // Sort results with safety checks
        results.sort((a, b) => {
          const aValue = a[sortBy] || 0;
          const bValue = b[sortBy] || 0;
          
          if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });

        setSearchResults(results);
        setInitialLoad(false);
      } catch (err) {
        console.error('Error in search:', err);
        setError('An error occurred while searching. Please try again.');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 800);
  }, [activeTab, fromCity, toCity, priceRange, selectedOperators, sortBy, sortOrder]);

  // Initializing search data
  useEffect(() => {
    try {
      const currentSearchData = getSearchData();
      
      if (currentSearchData) {
        // Use the search data from the home page
        setActiveTab(currentSearchData.transportType || 'buses');
        setFromCity(currentSearchData.fromCity || 'Nairobi');
        setToCity(currentSearchData.toCity || 'Mombasa');
        setPassengers(currentSearchData.passengers || 1);
        setDepartureDate(currentSearchData.departureDate || '');
      } else {
        // No search data, redirect to home after a delay
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
  }, [getSearchData, navigate]);

  // State change - search
  useEffect(() => {
    if (initialLoad) {
      handleSearch();
      setInitialLoad(false);
    }
  }, [fromCity, toCity, activeTab, handleSearch, initialLoad]);

  // Handle new search from results page
  const handleNewSearch = () => {
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  // No search data, show message
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')}
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
                >
                  {Cities.map(city => (
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
                  {Cities.filter(city => city !== fromCity).map(city => (
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

            <div className="flex items-end">
              <button
                className="w-full h-12 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={handleNewSearch}
              >
                Update Search
              </button>
            </div>
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
                    onChange={(e) => {
                      setPriceRange([priceRange[0], parseInt(e.target.value)]);
                    }}
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
                    aria-label={sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operators</label>
                <div className="flex flex-wrap gap-2">
                  {activeTab === 'buses' && (
                    <>
                      <button
                        className={`px-3 py-1 text-sm rounded-full ${selectedOperators.includes('Tahmeed') ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => toggleOperator('Tahmeed')}
                      >
                        Tahmeed
                      </button>
                      <button
                        className={`px-3 py-1 text-sm rounded-full ${selectedOperators.includes('Easy Coach') ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => toggleOperator('Easy Coach')}
                      >
                        Easy Coach
                      </button>
                      <button
                        className={`px-3 py-1 text-sm rounded-full ${selectedOperators.includes('Dreamline') ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => toggleOperator('Dreamline')}
                      >
                        Dreamline
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300"
                onClick={handleSearch}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching for trips...</p>
            </div>
          )}

          {/* Results List */}
          {!loading && (
            <div className="space-y-4">
              {activeTab === 'buses' ? (
                // Use BookingList component for buses
                <BookingList bookings={searchResults} />
              ) : (
                // For flights and trains, show a message
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

// Wrap the component with the error boundary
const Results = (props) => (
  <ResultsErrorBoundary>
    <ResultsComponent {...props} />
  </ResultsErrorBoundary>
);

export default Results;