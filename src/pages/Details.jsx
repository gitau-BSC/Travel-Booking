import React from 'react';
import { Link } from 'react-router-dom';
import WarningAlert from '../alertmessage/WarningAlert';
import BusSeat from '../pages/detail/seat/busseat/BusSeat';

const Details = () => {
  // const params = useParams(); 
  
  // show message box
  const message = (
    <>
      One Individual only can book 10 seats.If you want to book more than 10
      please <Link to={"/support-team"} className='text-yellow-500 font-medium'>contact support</Link>
    </>
  );

  // Fetch details with Id
  const allBookings = [
   {
      id: 1,
      type: "bus",
      company: "Easy Coach",
      route: "Nairobi to Mombasa",
      price: 1800,
      rating: 4.5,
      image: "/images/Easycoach1.jpg",
      description: "Premium coach service with business class facilities",
      amenities: ["Free WiFi", "USB charging", "Air Conditioning", "Refreshments", "Blankets"],
      reviews: [
        { user: "Mike Johnson", rating: 5, comment: "Best bus service in Kenya! Very professional." },
        { user: "Sarah Wilson", rating: 4, comment: "Comfortable seats and smooth ride." }
      ]
    },
      {
      id: 2,
      type: "shuttle",
      company: "Dreamline",
      route: "Nairobi to Kisumu",
      price: 1200,
      rating: 4.2,
      image: "/images/Dreamline1.jpg",
      description: "Economical shuttle service with reliable scheduling",
      amenities: ["Air Conditioning", "charging socket", "Luggage storage", "Water provided"],
      reviews: [
        { user: "David Brown", rating: 4, comment: "Good value for money and timely service." },
        { user: "Emily Davis", rating: 3, comment: "Basic but gets you to your destination." }
      ]
    }
  ];

  // Select a booking to display (e.g., the first one)
  const booking = allBookings[0];
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={booking.image} 
            alt={booking.type}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{booking.type}</h1>
                <p className="text-gray-600">{booking.company}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">${booking.price}</p>
                <p className="text-gray-500 text-sm">per day</p>
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <div className="flex items-center text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-gray-700">{booking.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mt-4">{booking.description}</p>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {booking.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
          <div className="space-y-4">
            {booking.reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center">
                  <div className="flex items-center text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-700">{review.rating}</span>
                  </div>
                  <span className="ml-2 font-medium text-gray-900">{review.user}</span>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seat layout and selection action detail */}
        <div className="w-full space-y-8 mt-6">
          {/* Warning Message */}
          <WarningAlert message={message} />
          
          {/* Seat Layout */}
          <BusSeat />
          
          {/* Bus Detail */}
          <div className="w-full flex items-center justify-center flex-col">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;