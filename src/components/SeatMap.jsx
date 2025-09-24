import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const SeatMap = () => {
  const navigate = useNavigate();
  const { selectedSchedule, setSelectedSeats } = useBookingStore();
  const [selectedSeats, setLocalSelectedSeats] = useState([]);

  if (!selectedSchedule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Trip Selected</h2>
          <button
            onClick={() => navigate('/booking')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  const { schedule, company, route, price } = selectedSchedule;

  const handleSeatSelect = (seat) => {
    if (!seat.is_available) return;

    setLocalSelectedSeats(prev => {
      if (prev.includes(seat.number)) {
        return prev.filter(s => s !== seat.number);
      } else {
        return [...prev, seat.number];
      }
    });
  };

  const handleProceedToCart = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    // Saves selected seats to store
    setSelectedSeats(selectedSeats);
    
    // cart Navigation
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Select Your Seats</h1>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{company} - {route}</h2>
              <p className="text-gray-600">
                Departure: {schedule.departure_time} | Arrival: {schedule.arrival_time}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-blue-600">KSh {price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">per seat</p>
            </div>
          </div>
        </div>

        {/* Seat Map */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Available Seats</h3>
          
          {/* Seat Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {schedule.seat_map.seats.map(seat => (
              <div
                key={seat.number}
                onClick={() => handleSeatSelect(seat)}
                className={`p-4 rounded-lg text-center cursor-pointer border-2 transition-all ${
                  !seat.is_available
                    ? 'bg-red-100 border-red-300 cursor-not-allowed'
                    : selectedSeats.includes(seat.number)
                    ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300'
                    : 'bg-green-100 border-green-300 hover:bg-green-200'
                }`}
              >
                <div className="font-bold">{seat.number}</div>
                <div className="text-xs text-gray-500">{seat.class}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-300 mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 mr-2"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-300 mr-2"></div>
              <span>Occupied</span>
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Your Selection</h3>
          {selectedSeats.length > 0 ? (
            <div>
              <p className="text-gray-700 mb-2">
                <strong>Selected Seats:</strong> {selectedSeats.join(', ')}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Total Price:</strong> KSh {(price * selectedSeats.length).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No seats selected yet</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/booking')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Trips
          </button>
          <button
            onClick={handleProceedToCart}
            disabled={selectedSeats.length === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Cart ({selectedSeats.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;