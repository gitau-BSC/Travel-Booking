import React, { useState, useEffect } from 'react';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdOutlineChair } from 'react-icons/md';
import { Link } from 'react-router-dom';
import busSeatData from '../../../../constants/busseat/BusSeatData';
import ErrorMessage from '../../../../alertmessage/error/ErrorMessage';

const BusSeat = () => {
  // Track seat selection
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showError, setShowError] = useState(false);

  // toggle seat selection
  const handleSeatClick = (seatId) => {
    // if the seat is already booked, ignore the click
    const selectedSeat = busSeatData.find((seat) => seat.id === seatId);
    if (selectedSeat.status === 'booked') {
      return;
    }
    
    // if the seat is available, select it
    setSelectedSeats((prevSelectedSeats) => {
      // check if seat is already selected
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        // show error if more than 10 seats are selected.
        if (prevSelectedSeats.length >= 10) {
          setShowError(true);
          return prevSelectedSeats;
        } else {
          return [...prevSelectedSeats, seatId];
        }
      }
    });
  };

  // Hide error message after 10 seconds
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  // function to determine seat class or seat name based on status
  const getSeatName = (seat) => {
    if (seat.status === 'booked') {
      return 'text-red-500 cursor-not-allowed';
    } 
    if (selectedSeats.includes(seat.id)) {
      return 'text-yellow-600 cursor-pointer';
    }
    return 'text-neutral-500 cursor-pointer';
  };

  return (
    <div className="w-full grid grid-cols-5 gap-10">
      {/* Seat layout */}
      <div className="col-span-3 w-full flex items-center justify-center shadow-sm rounded-xl p-4 border border-neutral-200">
        <div className="w-full space-y-7">
          <p className="text-base text-neutral-600 font-medium text-center">
            Click on available seats to reserve your seat.
          </p>

          {/* Seat layout */}
          <div className="w-full flex items-stretch gap-x-1.5">
            <div className="w-10 h-fit">
              <GiSteeringWheel className="text-3xl mt-7 text-primary -rotate-90" />
            </div>
            
            {/* Seat rows */}
            <div className="flex flex-col items-center border-l-2 border-dashed border-neutral-300 pl-7">
              <div className="flex-1 space-y-5">
                {/* first row */}
                <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                  {busSeatData.slice(0, 9).map((seat) => (
                    <div 
                      key={seat.id} 
                      className="flex items-center gap-x-0" 
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                      <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`} />
                    </div>
                  ))}
                </div>

                {/* second row */}
                <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                  {busSeatData.slice(9, 18).map((seat) => (
                    <div 
                      key={seat.id} 
                      className="flex items-center gap-x-0" 
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                      <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`} />
                    </div>
                  ))}
                </div>

                {/* third row */}
                <div className="w-full h-auto grid grid-cols-10 gap-x-5 justify-end">
                  <div className="col-span-9"></div>
                  {busSeatData.slice(18, 19).map((seat) => (
                    <div 
                      key={seat.id} 
                      className="flex items-center gap-x-0" 
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                      <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`} />
                    </div>
                  ))}
                </div>

                {/* fourth row */}
                <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                  {busSeatData.slice(19, 28).map((seat) => (
                    <div 
                      key={seat.id} 
                      className="flex items-center gap-x-0" 
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                      <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`} />
                    </div>
                  ))}
                </div>

                {/* fifth row */}
                <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                  {busSeatData.slice(28, 37).map((seat) => (
                    <div 
                      key={seat.id} 
                      className="flex items-center gap-x-0" 
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                      <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* reservation info */}
          <div className="w-full flex items-center justify-center gap-6 border-t border-neutral-200 pt-5">
            <div className="flex items-center gap-x-2">
              <MdOutlineChair className="text-xl text-neutral-500 -rotate-90" />
              <p className="text-sm text-neutral-500 font-medium">Available</p>
            </div>
            <div className="flex items-center gap-x-2">
              <MdOutlineChair className="text-xl text-red-500 -rotate-90" />
              <p className="text-sm text-neutral-500 font-medium">Booked</p>
            </div>

            <div className="flex items-center gap-x-2">
              <MdOutlineChair className="text-xl text-yellow-600 -rotate-90" />
              <p className="text-sm text-neutral-500 font-medium">Selected</p>
            </div>

            <div className="flex items-center gap-x-2">
              <i className="fas fa-money-bill-wave text-xl text-neutral-500"></i>
              <p className="text-sm text-neutral-500 font-medium">KSh 1600</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Seat selection action */}
      <div className="col-span-2 w-full space-y-5 bg-neutral-50 rounded-xl py-4 px-6 border border-neutral-200 shadow-sm">
        <div className="w-full space-y-2">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-lg text-neutral-600 font-medium">Your Destination</h1>
            <Link to="/bus-tickets" className="text-sm text-red-500">
              Change route
            </Link>
          </div>
        </div>
        
        <div className="w-full space-y-2">
          <h1 className="text-lg text-neutral-600 font-medium">Fare Details</h1>
          <div className="w-full flex items-center justify-between border-dashed border-b-[1.5px] border-neutral-400 pb-2">
            <h3 className="text-sm text-neutral-500 font-medium">Basic Fare: </h3>
            <p className="text-sm text-neutral-600 font-medium">KSh 1600</p>
          </div>

          <div className="flex items-center justify-between gap-x-4">
            <div className="flex flex-col gap-y-0.5">
              <h3 className="text-base text-neutral-500 font-medium">Total Price:</h3>
              <span className="text-xs text-neutral-500 font-normal">
                (Including all taxes)
              </span>
            </div>

            {/* Calculate the Total price */}
            <p className="text-base text-neutral-600 font-semibold">
              KSh{" "}
              {selectedSeats.reduce((total, seatId) => {
                const seat = busSeatData.find(busSeat => busSeat.id === seatId);
                return total + (seat ? seat.price : 0);
              }, 0)}
            </p>
          </div>
          
          <div className="bg-primary/20 rounded-lg py-0.5 px-1.5 text-xs text-neutral-600 font-normal uppercase w-fit">
            Non-refundable
          </div>
        </div>

        <div className="w-full">
          {selectedSeats.length > 0 ? (
            <div className="w-full flex flex-wrap gap-2">
              {selectedSeats.map(seatId => (
                  <div key={seatId} className="bg-yellow-100 px-2 py-1 rounded text-sm">
                    Seat {seatId}
                  </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex items-center gap-x-3">
              <p className="text-sm text-neutral-500 font-normal">No seat selected</p>
            </div>
          )}
        </div>

        <div className="space-y-0.5 w-full">
          <div className="w-full flex items-center justify-between gap-x-5">
            <p className="text-sm text-neutral-400 font-normal">
              From <span className="text-xs">(New Buspark)</span>
            </p>
            <p className="text-sm text-neutral-400 font-normal">
              To <span className="text-xs">(New Buspark)</span>
            </p>
          </div>
          <div className="w-full flex items-center justify-between gap-x-4">
            <h1 className="text-sm text-neutral-600 font-normal">
              Nairobi <span className="text-sm font-medium">(06:15 a.m)</span>
            </h1>

            <div className="flex-1 border-dashed border border-neutral-300" />
            
            <h1 className="text-sm text-neutral-600 font-normal">
              Mombasa <span className="text-sm font-medium">(08:45 a.m)</span>
            </h1>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          {selectedSeats.length > 0 ? (
            <Link 
              to="/bus-tickets/checkout" 
              className="w-full bg-primary hover:bg-primary/90 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center uppercase rounded-lg transition"
            >
              Proceed to Checkout
            </Link>
          ) : (
            <div className="w-full space-y-0.5">
              <button 
                disabled 
                className="w-full bg-primary/70 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center uppercase rounded-lg transition cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
              <small className="text-xs text-neutral-600 font-normal px-1">
                Please select at least one seat to proceed to checkout page.
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Show the error message if more than 10 */}
      {showError && <ErrorMessage message={"You can't select more than 10 seats!"} />}
    </div>
  );
};

export default BusSeat;