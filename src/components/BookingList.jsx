import React from 'react';
import { Link } from 'react-router-dom';

const BookingList = ({ bookings }) => {
  console.log('Bookings data:', bookings);
  
  const sampleBookings = [
    {
      id: 1,
      name: "Modern Coast",
      location: "Nairobi to Mombasa",
      price: 1500,
      rating: 4.5,
      image: "/images/Tahmeed.jpg",
      description: "Luxury Airplane with air conditioning, charging ports, and comfortable reclining seats"
    },
    {
      id: 2,
      name: "Easy Coach Premier",
      location: "Nairobi to Kisumu",
      price: 1200,
      rating: 4.3,
      image: "/images/Easycoach2.jpg",
      description: "Comfortable shuttle with free WiFi, refreshments, and onboard entertainment"
    },
    {
      id: 3,
      name: "Dreamline Luxury",
      location: "Nairobi to Nakuru",
      price: 800,
      rating: 4.7,
      image: "/images/Dreamline.jpg",
      description: "Premium luxury coach with business class seating and premium amenities"
    }
  ];

  const displayBookings = bookings && bookings.length > 0 ? bookings : sampleBookings;

  if (!displayBookings) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-600 text-lg">No booking data available</p>
      </div>
    );
  }

  if (displayBookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-600 text-lg">No bookings match your search criteria</p>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search parameters</p>
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
                alt={booking.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop";
                }}
              />
            </div>
            <div className="p-6 md:w-3/4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{booking.name}</h3>
                  <p className="text-gray-600">{booking.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">KSh {booking.price.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">one way</p>
                </div>
              </div>
              
              <p className="text-gray-700 mt-4">{booking.description}</p>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-700">{booking.rating}/5</span>
                </div>
                
                <Link 
                  to={`/details/${booking.id}`}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  View Details & Book
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingList;