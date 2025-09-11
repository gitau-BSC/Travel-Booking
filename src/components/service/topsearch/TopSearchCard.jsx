import React from 'react';
import { FaWifi } from 'react-icons/fa';
import { GiWaterBottle, GiCharging } from 'react-icons/gi';
import { IoTv } from 'react-icons/io5';
import { useReservation } from '../../contexts/ReservationContext'; 

const TopSearchCard = ({ routeFrom, routeTo, timeDuration, price, routeId }) => {
  const { dispatch } = useReservation();

  const handleReserveSeat = () => {
    // route object with necessary details
    const routeDetails = {
      id: routeId || `${routeFrom}-${routeTo}`.toLowerCase().replace(/\s+/g, '-'),
      from: routeFrom,
      to: routeTo,
      duration: timeDuration,
      price: parseInt(price.replace(/,/g, ''), 10), 
      amenities: ['internet', 'snacks', 'tv', 'charging'] 
    };

    // Dispatch action to select this route
    dispatch({
      type: 'SELECT_ROUTE',
      payload: routeDetails
    });

    // navigate to the seat selection page
    console.log('Route selected:', routeDetails);
    
    // alert
    alert(`Selected route: ${routeFrom} to ${routeTo}. You would now be redirected to seat selection.`);
  };

  return (
    <div className="w-full rounded-xl p-4 sm:p-5 border-2 border-neutral-300 space-y-2 relative">
        <div className="space-y-3.5 w-full">
          {/* Route */}
          <div className="space-y-0">
            <div className="w-full flex items-center justify-between">
              <p className="text-xs text-neutral-400 font-normal">From</p>
              <p className="text-xs text-neutral-400 font-normal">To</p>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2 sm:gap-x-3">
              {/* From */}
              <h1 className="text-lg sm:text-xl text-neutral-600 font-semibold truncate">
                {routeFrom}
              </h1>

              {/* Time duration */}
              <div className="flex-1 border-dashed border border-neutral-400 relative mx-1 sm:mx-2">
                <p className="absolute w-fit px-2 sm:px-3 h-5 sm:h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50 rounded-full flex items-center justify-center text-xs sm:text-sm text-neutral-500 font-normal border-dashed border border-neutral-400 z-10">
                  {timeDuration}
                </p>
              </div>
              
              {/* To */}
              <h1 className="text-lg sm:text-xl text-neutral-600 font-semibold truncate">
                {routeTo}
              </h1>
            </div>
          </div>
          
          {/* facilitates */}
          <div className="w-full flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* first one */}
            <div className="flex items-center gap-x-1">
              <FaWifi className='w-3 h-3 text-neutral-500'/>
              <p className="text-xs text-neutral-600 font-normal hidden xs:inline">
                internet
              </p>
            </div>
            {/* Second one */}
            <div className="flex items-center gap-x-1">
              <GiWaterBottle className='w-3 h-3 text-neutral-500'/>
              <p className="text-xs text-neutral-600 font-normal hidden xs:inline">
                Snacks
              </p>
            </div>

            {/* Third one */}
            <div className="flex items-center gap-x-1">
              <IoTv className='w-3 h-3 text-neutral-500'/>
              <p className="text-xs text-neutral-600 font-normal hidden xs:inline">
                Tv
              </p>
            </div>
            {/* fourth one */}
            <div className="flex items-center gap-x-1">
              <GiCharging className='w-3 h-3 text-neutral-500'/>
              <p className="text-xs text-neutral-600 font-normal hidden xs:inline">
                Mobile Charging
              </p>
            </div>
          </div>
          
          <div className="w-full flex flex-col xs:flex-row items-center justify-between gap-3 mt-4">
            {/* Price */}
            <h1 className="text-lg sm:text-xl text-neutral-700 font-semibold whitespace-nowrap">
              KES {price}
            </h1>

            {/* Button with reservation logic */}
            <button 
              onClick={handleReserveSeat}
              className="w-full xs:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 hover:bg-transparent border-2 border-green-600 hover:border-green-600 rounded-xl text-xs sm:text-sm font-normal text-neutral-50 hover:text-green-600 flex items-center justify-center transition-colors duration-300 whitespace-nowrap cursor-pointer relative z-20"
            >
              Reserve Seat
            </button>
          </div>
        </div>    
    </div>
  );
};

export default TopSearchCard;