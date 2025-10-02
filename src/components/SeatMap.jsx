import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBookingStore from "../store/useBookingStore";

const SeatMap = () => {
  const navigate = useNavigate();
  const { selectedSchedule, setSelectedSeats: saveToStore } = useBookingStore();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // seats fetch from API
  useEffect(() => {
    if (!selectedSchedule) {
      setLoading(false);
      return;
    }

    const fetchSeats = async () => {
      try {
        setLoading(true);
        setError(null);

        // API parameters 
        const params = new URLSearchParams({
          bus_id: selectedSchedule.id?.toString() || '119',
          leaving_from: selectedSchedule.from || 'Nairobi',
          going_to: selectedSchedule.to || 'Mombasa',
          departing_on: '',
          rsc_id: selectedSchedule.rsc_id || '1',
          start_point: selectedSchedule.start_point || '25',
          end_point: selectedSchedule.end_point || '27',
          alias: selectedSchedule.alias || 'soores',
          date: formatDate(selectedSchedule.departure_date) || '2-10-2025',
          fleet_registration_id: selectedSchedule.id?.toString() || '119',
          no_of_seats: selectedSchedule.capacity?.toString() || '41',
          fare: selectedSchedule.price?.toString() || '0',
          id: selectedSchedule.id?.toString() || '119'
        });

        const url = `https://dev.marketplaceapi.buupass.com/marketplace/buses/seats?${params.toString()}`;
        
        console.log('Fetching seats from:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Api-Key 66Shf2aP.owT6xw6QKSWNO9EeQIIlz20JM3nNHul3',
            'Accept': 'application/json, text/plain, */*',
            'Referer': 'https://www.beta.buupass.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
          }
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Seat API response:', data);

        // Transforming API response to seat format
        const transformedSeats = transformSeatData(data);
        setSeats(transformedSeats);

      } catch (err) {
        console.error("Error fetching seats:", err);
        setError("Failed to load seats. Please try again.");
        // Fallback to mock seats
        setSeats(generateMockSeats());
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [selectedSchedule]);

  // Helper function to format date as DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '2-10-2025';
    
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (error) {
      return '2-10-2025';
    }
  };

  // API response to seat format
  const transformSeatData = (apiData) => {
    console.log('Transforming seat data:', apiData);
    
    // response structures
    if (apiData.data?.seats && Array.isArray(apiData.data.seats)) {
      return apiData.data.seats.map(seat => ({
        number: seat.number || seat.seat_number,
        is_available: seat.status !== 'booked',
        class: seat.class || 'standard',
        position: getSeatPosition(seat.number),
        price: seat.fare || selectedSchedule?.price || 1000
      }));
    }
    
    if (apiData.seats && Array.isArray(apiData.seats)) {
      return apiData.seats.map(seat => ({
        number: seat.number || seat.seat_number,
        is_available: seat.status !== 'booked',
        class: seat.class || 'standard',
        position: getSeatPosition(seat.number),
        price: seat.fare || selectedSchedule?.price || 1000
      }));
    }

    // To generate mock seats
    console.warn('Unrecognized API response structure, using mock data');
    return generateMockSeats();
  };

  // mock seats as fallback
  const generateMockSeats = () => {
    const seats = [];
    const rows = 10;
    const seatsPerRow = 4;
    
    for (let row = 1; row <= rows; row++) {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const seatLetter = String.fromCharCode(64 + seatNum);
        const isPremium = row <= 2;
        
        seats.push({
          number: `${row}${seatLetter}`,
          is_available: Math.random() > 0.3, 
          class: isPremium ? 'premium' : 'standard',
          position: getSeatPosition(`${row}${seatLetter}`),
          price: isPremium ? 1500 : (selectedSchedule?.price || 1000)
        });
      }
    }
    return seats;
  };

  // Helper to determine seat position
  const getSeatPosition = (seatNumber) => {
    if (!seatNumber) return 'aisle';
    const lastChar = seatNumber.toString().slice(-1).toUpperCase();
    if (['A', 'D'].includes(lastChar)) return 'window';
    if (['B', 'C'].includes(lastChar)) return 'aisle';
    return 'aisle';
  };

  const handleSeatSelect = (seat) => {
    if (!seat.is_available) return;

    setSelectedSeats((prev) => {
      const isAlreadySelected = prev.some(s => s.number === seat.number);
      
      if (isAlreadySelected) {
        return prev.filter(s => s.number !== seat.number);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleProceedToCart = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    
    // seat numbers and full seat objects saved to store
    saveToStore(selectedSeats);
    navigate("/cart");
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  if (!selectedSchedule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">No trip selected</p>
          <button
            onClick={() => navigate("/booking")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Trips
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Select Your Seats
          </h1>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                {selectedSchedule.company} - {selectedSchedule.route}
              </h2>
              <p className="text-gray-600">
                Departure: {selectedSchedule.departure_time} | Arrival:{" "}
                {selectedSchedule.arrival_time}
              </p>
              <p className="text-gray-600">
                Date: {selectedSchedule.departure_date}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-blue-600">
                KSh {selectedSchedule.price?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">starting price</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Seat Map */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Available Seats</h3>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading available seats...</p>
            </div>
          ) : (
            <>
              {/* Bus Layout Visualization */}
              <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <div className="text-center mb-4">
                  <div className="inline-block bg-gray-300 px-4 py-2 rounded">
                    🚗 Driver
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {seats.map((seat) => (
                    <div
                      key={seat.number}
                      onClick={() => handleSeatSelect(seat)}
                      className={`p-4 rounded-lg text-center cursor-pointer border-2 transition-all relative ${
                        !seat.is_available
                          ? "bg-red-100 border-red-300 cursor-not-allowed"
                          : selectedSeats.some(s => s.number === seat.number)
                          ? "bg-blue-100 border-blue-500 ring-2 ring-blue-300"
                          : "bg-green-100 border-green-300 hover:bg-green-200"
                      } ${seat.class === 'premium' ? 'ring-1 ring-yellow-400' : ''}`}
                    >
                      <div className="font-bold">{seat.number}</div>
                      <div className="text-xs text-gray-500 capitalize">{seat.class}</div>
                      <div className="text-xs font-semibold mt-1">
                        KSh {seat.price.toLocaleString()}
                      </div>
                      {seat.class === 'premium' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full text-xs flex items-center justify-center">
                          ★
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <div className="inline-block bg-gray-300 px-4 py-2 rounded">
                    🚪 Exit
                  </div>
                </div>
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
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 border-2 border-yellow-400 mr-2"></div>
                  <span>Premium</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Your Selection</h3>
          {selectedSeats.length > 0 ? (
            <div>
              <p className="text-gray-700 mb-2">
                <strong>Selected Seats:</strong> {selectedSeats.map(s => s.number).join(", ")}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Seat Details:</strong>
              </p>
              <div className="space-y-2 mb-4">
                {selectedSeats.map(seat => (
                  <div key={seat.number} className="flex justify-between text-sm">
                    <span>Seat {seat.number} ({seat.class})</span>
                    <span>KSh {seat.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <p className="text-xl font-bold text-green-600 border-t pt-2">
                <strong>Total Price:</strong> KSh {calculateTotalPrice().toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No seats selected yet</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/booking")}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Trips
          </button>
          <button
            onClick={handleProceedToCart}
            disabled={selectedSeats.length === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Proceed to Cart ({selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'})
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;