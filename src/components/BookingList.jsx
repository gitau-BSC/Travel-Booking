import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const BookingList = ({ bookings }) => {
  const navigate = useNavigate();
  const { selectSchedule } = useBookingStore();

  const sampleBookings = [
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

  const displayBookings = bookings && bookings.length > 0 ? bookings : sampleBookings;

  const handleSelectTrip = (booking) => {
    // Storage for selected booking 
    selectSchedule(booking);
    // Navigation to seat selection
    navigate('/seats');
  };

  if (!displayBookings || displayBookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-600 text-lg">No bookings available</p>
        <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {displayBookings.map(booking => (
        <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="md:flex">
            <div className="md:w-1/4">
              <img 
                src={booking.image} 
                alt={booking.company}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop";
                }}
              />
            </div>
            <div className="p-6 md:w-3/4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{booking.company}</h3>
                  <p className="text-gray-600">{booking.route}</p>
                  <p className="text-sm text-gray-500 mt-1">{booking.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">KSh {booking.price.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">per seat</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Departure:</span> {booking.departure}
                </div>
                <div>
                  <span className="font-medium">Arrival:</span> {booking.arrival}
                </div>
                <div>
                  <span className="font-medium">Seats Available:</span> {booking.seatsAvailable}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-700">4.5/5</span>
                </div>
                
                <button
                  onClick={() => handleSelectTrip(booking)}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Select This Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingList;