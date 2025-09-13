import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SeatMap from "../components/SeatMap";
import WarningAlert from '../alertmessage/WarningAlert';
import { Link } from 'react-router-dom';

const Booking = () => {
  const [trip, setTrip] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get trip data from navigation state or session storage
    if (location.state && location.state.trip) {
      setTrip(location.state.trip);
      sessionStorage.setItem('selectedTrip', JSON.stringify(location.state.trip));
    } else {
      const savedTrip = sessionStorage.getItem('selectedTrip');
      if (savedTrip) {
        setTrip(JSON.parse(savedTrip));
      } else {
        // Redirect if no trip data is available
        navigate('/');
      }
    }
  }, [location, navigate]);

  const handleSeatSelect = (seatNumber) => {
    // Limit to 10 seats per booking
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else if (selectedSeats.length < 10) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    } else {
      alert("Maximum 10 seats per booking. Please contact support for larger bookings.");
    }
  };

  const handlePassengerChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = async () => {
    // Validate inputs
    if (!passengerDetails.name || !passengerDetails.email || !passengerDetails.phone) {
      alert("Please fill in all passenger details");
      return;
    }
    
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    try {
      // Create booking object
      const bookingData = {
        trip,
        selectedSeats,
        passengerDetails,
        totalPrice: calculateTotalPrice(),
        bookingReference: generateBookingReference(),
        bookingDate: new Date().toISOString()
      };

      // Save to localStorage (replace with API call in real application)
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(bookingData);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      // Clear session storage
      sessionStorage.removeItem('selectedTrip');
      
      // Redirect to confirmation page
      navigate('/booking-confirmation', { state: { booking: bookingData } });
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = parseFloat(trip.price.replace('KSh ', '').replace(',', ''));
    return `KSh ${(basePrice * selectedSeats.length).toLocaleString()}`;
  };

  const generateBookingReference = () => {
    return 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Warning message
  const message = (
    <>
      One individual can only book 10 seats. If you want to book more than 10
      please <Link to="/support-team" className="text-yellow-500 font-medium">contact support</Link>
    </>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      {/* Warning Message */}
      <WarningAlert message={message} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Trip Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{trip.company}</h3>
              <p className="text-sm text-gray-500 capitalize">{trip.transportType}</p>
            </div>
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              {trip.price}
            </span>
          </div>
          
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-lg font-bold">{trip.departureTime}</p>
              <p className="text-sm text-gray-600">{trip.fromCity}</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <p className="text-sm text-gray-500">{trip.duration}</p>
              <div className="w-16 h-px bg-gray-600 my-2"></div>
              <p className="text-xs text-gray-500">Direct</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{trip.arrivalTime}</p>
              <p className="text-sm text-gray-600">{trip.toCity}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {trip.amenities.map((amenity, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                {amenity}
              </span>
            ))}
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">Departure Date: {trip.departureDate}</p>
          </div>
        </div>
        
        {/* Seat Selection */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Select Seats</h2>
          <SeatMap 
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
            schedule={trip.schedule} // Make sure your trip data includes schedule info
          />
          <div className="mt-4">
            <p className="text-sm">Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
            <p className="text-xs text-gray-500 mt-1">Maximum 10 seats per booking</p>
          </div>
        </div>
        
        {/* Passenger Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={passengerDetails.name}
                onChange={handlePassengerChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={passengerDetails.email}
                onChange={handlePassengerChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={passengerDetails.phone}
                onChange={handlePassengerChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Booking Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Ticket Price:</span>
              <span>{trip.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Number of Seats:</span>
              <span>{selectedSeats.length}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>{calculateTotalPrice()}</span>
            </div>
          </div>
          
          <button
            onClick={handleBooking}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;