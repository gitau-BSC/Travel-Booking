import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const BookingList = ({ bookings }) => {
  const navigate = useNavigate();
  const { selectSchedule } = useBookingStore();
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');

  const sampleBookings = [
    {
      id: 1,
      type: "bus",
      company: "Tahmeed",
      route: "Nairobi to Mombasa",
      price: 1800,
      departure: "08:00",
      arrival: "16:00",
      seatsAvailable: 24,
      image: "/images/Tahmeed.jpg",
      rating: 4.5,
      amenities: ["Wi-Fi", "AC", "Charging Ports", "Refreshments"],
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
        destination: "Kakamega",
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
        departure_time: "10:30",
        arrival_time: "16:00",
        origin: "Nairobi",
        destination: "Eldoret",
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
        arrival_time: "15:30",
        origin: "Nairobi",
        destination: "Malindi",
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
        destination: "Kisumu",
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

  const displayBookings = bookings && bookings.length > 0 ? bookings : sampleBookings;

  // Filter and sort bookings
  const filteredBookings = filterBy === 'all' 
    ? displayBookings 
    : displayBookings.filter(booking => {
        if (filterBy === 'air') return booking.type === 'airline';
        if (filterBy === 'rail') return booking.type === 'train';
        return booking.type.includes(filterBy);
      });
  
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'departure') return a.departure.localeCompare(b.departure);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'duration') {
      const getDuration = (booking) => {
        if (booking.arrival.includes('+')) return 14; 
        const depTime = parseInt(booking.departure.split(':')[0]);
        const arrTime = parseInt(booking.arrival.split(':')[0]);
        return arrTime - depTime;
      };
      return getDuration(a) - getDuration(b);
    }
    return 0;
  });

  const handleSelectTrip = (booking) => {
    selectSchedule(booking);
    navigate('/seats');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'bus':
        return '🚌';
      case 'shuttle':
        return '🚐';
      case 'luxury bus':
        return '🚍';
      case 'train':
        return '🚆';
      case 'airline':
        return '✈️';
      default:
        return '🚗';
    }
  };

  if (!displayBookings || displayBookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-600 text-lg font-medium">No bookings available</p>
        <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter and Sort Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2 font-medium">Filter:</span>
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Transport</option>
              <option value="bus">Buses</option>
              <option value="shuttle">Shuttles</option>
              <option value="luxury">Luxury</option>
              <option value="rail">Trains</option>
              <option value="air">Flights</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-600 mr-2 font-medium">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="price">Price (Low to High)</option>
              <option value="departure">Departure Time</option>
              <option value="rating">Rating</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          {sortedBookings.length} {sortedBookings.length === 1 ? 'option' : 'options'} available
        </div>
      </div>

      {/* Booking Cards */}
      {sortedBookings.map(booking => {
        const getPeakType = (departure) => {
          const hour = parseInt(departure.split(':')[0]);
          if (hour >= 7 && hour <= 9) return 'super_peak';
          if ((hour >= 17 && hour <= 19) || (hour >= 6 && hour <= 10)) return 'peak';
          return 'off_peak';
        };
        
        const peakType = getPeakType(booking.departure);
        const peakConfig = {
          peak: { label: 'Peak', color: 'bg-orange-100 text-orange-800' },
          super_peak: { label: 'Super Peak', color: 'bg-red-100 text-red-800' },
          off_peak: { label: 'Off-Peak', color: 'bg-green-100 text-green-800' }
        };

        return (
          <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="md:flex">
              <div className="md:w-1/4 relative">
                <img 
                  src={booking.image} 
                  alt={booking.company}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop";
                  }}
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                  {getTypeIcon(booking.type)} <span className="ml-1">{booking.type}</span>
                </div>

                {booking.seatsAvailable < 10 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Almost Full!
                  </div>
                )}

                {/* Peak Type Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${peakConfig[peakType].color}`}>
                    {peakConfig[peakType].label}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:w-3/4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{booking.company}</h3>
                    <p className="text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {booking.route}
                    </p>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {renderStars(booking.rating)}
                      </div>
                      <span className="ml-1 text-sm text-gray-700">{booking.rating}/5</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{booking.seatsAvailable} seats left</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">KSh {booking.price.toLocaleString()}</p>
                    <p className="text-gray-500 text-sm">per seat</p>
                    {peakType !== 'off_peak' && (
                      <p className="text-xs text-orange-600 mt-1">
                        {peakType === 'super_peak' ? 'Premium' : 'Peak'} pricing
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-medium">Departure:</span> {booking.departure}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-medium">Arrival:</span> {booking.arrival}
                    </div>
                  </div>
                </div>
                
                {/* Amenities */}
                {booking.amenities && booking.amenities.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {booking.amenities.length > 4 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          +{booking.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {booking.arrival.includes('+') ? 'Overnight journey' : `Estimated duration: ${Math.abs(
                      parseInt(booking.arrival.split(':')[0]) - parseInt(booking.departure.split(':')[0])
                    )} hours`}
                  </div>
                  
                  <button
                    onClick={() => handleSelectTrip(booking)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center"
                  >
                    Select This Trip
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingList;