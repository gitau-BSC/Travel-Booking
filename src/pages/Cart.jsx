import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const Cart = () => {
  const navigate = useNavigate();
  const { selectedSchedule, selectedSeats } = useBookingStore();

  if (!selectedSchedule || !selectedSeats || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/booking')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Trips
          </button>
        </div>
      </div>
    );
  }

  const { company, route, price, schedule } = selectedSchedule;
  const totalPrice = price * selectedSeats.length;

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p><strong>Company:</strong> {company}</p>
              <p><strong>Route:</strong> {route}</p>
              <p><strong>Departure:</strong> {schedule.departure_time}</p>
              <p><strong>Arrival:</strong> {schedule.arrival_time}</p>
            </div>
            <div>
              <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
              <p><strong>Price per seat:</strong> KSh {price.toLocaleString()}</p>
              <p><strong>Number of seats:</strong> {selectedSeats.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <span>Subtotal</span>
            <span>KSh {totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <span>Booking Fee</span>
            <span>KSh 100</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span>KSh {(totalPrice + 100).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/seats')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Seat Selection
          </button>
          <button
            onClick={handleProceedToCheckout}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;