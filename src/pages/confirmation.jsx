import React, { useState, useEffect } from 'react';
import useBookingStore from '../store/useBookingStore';

const Confirmation = () => {
  const { selectedSchedule, selectedSeats, clearCart } = useBookingStore();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // mock booking confirmation
  useEffect(() => {
    if (selectedSchedule && selectedSeats.length > 0) {
      setLoading(true);
      
      // API call to create booking
      setTimeout(() => {
        try {
          const bookingNumber = `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
          const totalPrice = selectedSeats.length * selectedSchedule.price;
          
          setBookingDetails({
            bookingNumber,
            schedule: selectedSchedule,
            seats: selectedSeats,
            totalPrice,
            passengerCount: selectedSeats.length,
            bookingDate: new Date().toLocaleDateString(),
            bookingTime: new Date().toLocaleTimeString()
          });
        } catch (err) {
          setError(`Failed to process booking: ${err.message}. Please try again.`);
        } finally {
          setLoading(false);
        }
      }, 1500);
    }
  }, [selectedSchedule, selectedSeats]);

  const handlePrint = () => {
    window.print();
  };

  const handleNewBooking = () => {
    clearCart();
    window.location.href = '/'; 
  };

  if (!selectedSchedule || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Booking Found</h2>
          <p className="text-gray-600 mb-6">It seems you haven't made a booking yet.</p>
          <button 
            onClick={() => window.location.href = '/'} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Start New Booking
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Processing Your Booking...</h2>
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600">Please wait while we confirm your reservation</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-green-600">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Booking #: {bookingDetails?.bookingNumber}</p>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Journey Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Journey Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Route:</span>
                  <span className="text-gray-800 font-semibold">{selectedSchedule.origin} → {selectedSchedule.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Departure:</span>
                  <span className="text-gray-800 text-right">
                    {new Date(selectedSchedule.departureTime).toLocaleDateString()} at{' '}
                    {new Date(selectedSchedule.departureTime).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Arrival:</span>
                  <span className="text-gray-800 text-right">
                    {new Date(selectedSchedule.arrivalTime).toLocaleDateString()} at{' '}
                    {new Date(selectedSchedule.arrivalTime).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Bus Type:</span>
                  <span className="text-gray-800">{selectedSchedule.busType || 'Standard'}</span>
                </div>
              </div>
            </div>

            {/* Seat Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Seat Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Selected Seats:</span>
                  <span className="text-blue-600 font-semibold">{selectedSeats.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Passengers:</span>
                  <span className="text-gray-800">{selectedSeats.length}</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Fare per seat:</span>
                  <span className="text-gray-800">${selectedSchedule.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Seats booked:</span>
                  <span className="text-gray-800">{selectedSeats.length}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-800 font-semibold">Total Amount:</span>
                  <span className="text-green-600 font-bold text-lg">
                    ${bookingDetails?.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Booking Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Booking Date:</span>
                  <span className="text-gray-800">{bookingDetails?.bookingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Booking Time:</span>
                  <span className="text-gray-800">{bookingDetails?.bookingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span className="text-green-600 font-semibold">Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={handlePrint}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Print Ticket
            </button>
            <button 
              onClick={handleNewBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Book Another Trip
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-600">
            <p className="mb-2">Thank you for choosing our service! Your tickets have been emailed to you.</p>
            <p className="text-sm italic">
              Need help? Contact support at support@busbooking.com or call 1-800-BUS-RIDE
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
          body {
            background: white !important;
          }
          .max-w-4xl {
            max-width: none;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Confirmation;