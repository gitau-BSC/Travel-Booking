// src/store/useBookingStore.js
import { create } from 'zustand';

// Create the store
const useBookingStore = create((set, get) => ({
  // --- STATE ---

  // Step 1: Search Criteria
  searchCriteria: {
    origin: '',
    destination: '',
    date: null, // Will be a JavaScript Date object or string
    passengers: 1,
  },

  // Step 2: Available Schedules & Selection
  availableSchedules: [], // This will hold the list of trips from the search
  selectedSchedule: null, // This will hold the one schedule the user picks

  // Step 3: Seat Selection
  selectedSeats: [], // This will be an array of seat numbers, e.g., ['2A', '2B']

  // Step 4: Passenger Details
  passengerDetails: [], // Will hold objects like { name, age, seatNumber }

  // Step 5: Payment & Confirmation
  bookingSummary: null,

  // --- ACTIONS ---

  // Action to update the search criteria (used on the homepage)
  setSearchCriteria: (newCriteria) => {
    set({ searchCriteria: newCriteria });
  },

  // Action to store the fetched schedules (will be called after a mock API call)
  setAvailableSchedules: (schedules) => {
    set({ availableSchedules: schedules });
  },

  // Action to select a specific schedule (when user clicks "Select" on a trip)
  selectSchedule: (schedule) => {
    set({ 
      selectedSchedule: schedule,
      // Reset seats and passenger details when a new schedule is chosen
      selectedSeats: [],
      passengerDetails: [] 
    });
  },

  // Action to toggle seat selection (used by your SeatMap component)
  toggleSeatSelection: (seatNumber) => {
    const currentSelectedSeats = get().selectedSeats;
    
    let newSelectedSeats;
    if (currentSelectedSeats.includes(seatNumber)) {
      // If seat is already selected, remove it (deselect)
      newSelectedSeats = currentSelectedSeats.filter(num => num !== seatNumber);
    } else {
      // If seat is not selected, add it
      newSelectedSeats = [...currentSelectedSeats, seatNumber];
    }
    
    set({ selectedSeats: newSelectedSeats });
  },

  // Action to add passenger details for the selected seats
  setPassengerDetails: (details) => {
    set({ passengerDetails: details });
  },

  // Action to finalize the booking (will be called after payment)
  setBookingSummary: (summary) => {
    set({ bookingSummary: summary });
  },

  // Action to clear the entire booking state (e.g., after booking is complete or user starts over)
  clearBooking: () => {
    set({
      searchCriteria: { origin: '', destination: '', date: null, passengers: 1 },
      availableSchedules: [],
      selectedSchedule: null,
      selectedSeats: [],
      passengerDetails: [],
      bookingSummary: null,
    });
  },
}));

// Export the store
export default useBookingStore;