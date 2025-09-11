import React, { createContext, useContext, useReducer } from 'react'; // Added useContext import

// context
const ReservationContext = createContext();

const initialState = {
  selectedRoute: null,
  selectedSeats: [],
  passengerDetails: [],
  bookingStage: 'route_selection', 
};

function reservationReducer(state, action) {
  switch (action.type) {
    case 'SELECT_ROUTE':
      return {
        ...state,
        selectedRoute: action.payload,
        bookingStage: 'seat_selection'
      };
    case 'SELECT_SEAT': {
      const isSelected = state.selectedSeats.includes(action.payload);
      return {
        ...state,
        selectedSeats: isSelected
          ? state.selectedSeats.filter(seat => seat !== action.payload)
          : [...state.selectedSeats, action.payload]
      };
    }
    case 'ADD_PASSENGER_DETAILS':
      return {
        ...state,
        passengerDetails: action.payload,
        bookingStage: 'payment'
      };
    case 'PROCEED_TO_PAYMENT':
      return {
        ...state,
        bookingStage: 'payment'
      };
    case 'COMPLETE_BOOKING':
      return {
        ...initialState,
        bookingStage: 'confirmation'
      };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
}

export const ReservationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationReducer, initialState);
  
  return (
    <ReservationContext.Provider value={{ state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
};

// hook export
export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};


export default ReservationContext;