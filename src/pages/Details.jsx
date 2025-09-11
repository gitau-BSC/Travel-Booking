import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import WarningAlert from '../alertmessage/WarningAlert';
import SeatMap from '../components/SeatMap';

const Details = () => {
  const { id } = useParams(); 
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch booking details based on ID
  useEffect(() => {
    // API call
    const fetchBookingDetails = async () => {
      try {
        // Simulate API call
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
            ],
            schedule: {
              // schedule data for SeatMap
              departure_time: "08:00",
              arrival_time: "14:00",
              origin: "Nairobi",
              destination: "Mombasa",
              seat_map: {
                seats: [
                  // Array of seat objects
                  { number: "1A", is_available: true, class: "standard", position: "window" },
                  { number: "1B", is_available: true, class: "standard", position: "aisle" },
                  // ... more seats
                ]
              }
            }
          }
        ];
        
        const selectedBooking = allBookings.find(b => b.id === parseInt(id));
        setBooking(selectedBooking);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, [id]);

  // show message box
  const message = (
    <>
      One Individual only can book 10 seats.If you want to book more than 10
      please <Link to={"/support-team"} className='text-yellow-500 font-medium'>contact support</Link>
    </>
  );

  if (loading) {
    return <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">Loading...</div>;
  }

  if (!booking) {
    return <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">Booking not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Details component ... */}
        
        {/* Seat layout and selection action detail */}
        <div className="w-full space-y-8 mt-6">
          {/* Warning Message */}
          <WarningAlert message={message} />
          
          {/* Seat Layout */}
          <SeatMap schedule={booking.schedule} />
        </div>
      </div>
    </div>
  );
};

export default Details;