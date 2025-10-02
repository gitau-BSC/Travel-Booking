import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const Checkout = () => {
  const navigate = useNavigate();
  const { selectedSchedule, selectedSeats } = useBookingStore();
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: 'mpesa'
  });

  if (!selectedSchedule || !selectedSeats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No booking information found</h2>
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
  const totalPrice = price * selectedSeats.length + 100;

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment and booking here
    alert('Booking confirmed! Redirecting to confirmation page...');
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method *
                </label>
                <select
                  name="paymentMethod"
                  value={customerInfo.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="mpesa">M-Pesa</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash Payment</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
              >
                Confirm Booking - KSh {totalPrice.toLocaleString()}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="mb-4">
              <p><strong>Trip:</strong> {company} - {route}</p>
              <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
              <p><strong>Departure:</strong> {schedule.departure_time}</p>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Seats ({selectedSeats.length} × KSh {price.toLocaleString()})</span>
                <span>KSh {(price * selectedSeats.length).toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Booking Fee</span>
                <span>KSh 100</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>KSh {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;