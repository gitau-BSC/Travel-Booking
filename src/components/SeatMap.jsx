import useBookingStore from '../store/useBookingStore';

// schedule prop
const SeatMap = ({ schedule }) => {

  const { selectedSeats, toggleSeatSelection } = useBookingStore();

  // Toggle function for seats-Zustand
  const handleSeatClick = (seat) => {
    if (seat.is_available) {
      toggleSeatSelection(seat.number);
    }
  };

  // Rendering the seat map
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Select Your Seats</h2>
        <p className="text-gray-600">Click on an available seat to select it.</p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 border border-green-600 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 border border-gray-400 rounded"></div>
          <span>Booked</span>
        </div>
      </div>

      {/* Bus Layout */}
      <div className="flex flex-col items-center">
        
        {/* "Driver" icon */}
        <div className="w-16 h-8 mb-4 bg-gray-500 rounded-t-full flex items-center justify-center">
          <span className="text-xs text-white">Driver</span>
        </div>

        {/* Grid of Seats */}
        <div className="grid grid-cols-4 gap-2">
          {schedule.seat_map.seats.map((seat) => {
            // Css classes for seats available
            let seatStyle = '';
            if (!seat.is_available) {
              seatStyle = 'bg-gray-300 text-gray-500 cursor-not-allowed'; // Booked
            } else if (selectedSeats.includes(seat.number)) {
              seatStyle = 'bg-green-500 text-white hover:bg-green-600'; // Selected by user
            } else {
              seatStyle = 'bg-blue-100 text-blue-900 hover:bg-blue-200'; // Available
            }

            return (
              <button
                key={seat.number}
                onClick={() => handleSeatClick(seat)}
                disabled={!seat.is_available}
                className={`w-12 h-12 rounded flex items-center justify-center font-medium border transition-colors ${seatStyle}`}
                title={`Seat ${seat.number} (${seat.class}, ${seat.position})`} // Helpful tooltip
              >
                {seat.number}
              </button>
            );
          })}
        </div>

        {/* "Aisle" label */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          <p className="font-bold">| |</p>
          <p>Aisle</p>
        </div>
      </div>

      {/* Display Summary of Selected Seats */}
      <div className="mt-8 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold">Your Selection:</h3>
        {selectedSeats.length > 0 ? (
          <p>Seats: <span className="font-bold">{selectedSeats.join(', ')}</span></p>
        ) : (
          <p>No seats selected yet.</p>
        )}
      </div>
    </div>
  );
};

export default SeatMap;