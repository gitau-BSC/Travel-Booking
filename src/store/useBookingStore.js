import { create } from 'zustand';

const useBookingStore = create((set) => ({
  // --- STATE ---
  selectedSchedule: null,
  selectedSeats: [],
  
  // --- ACTIONS ---
  selectSchedule: (schedule) => set({ selectedSchedule: schedule }),
  setSelectedSeats: (seats) => set({ selectedSeats: seats }),
  
  clearCart: () => set({ selectedSchedule: null, selectedSeats: [] }),
}));

export default useBookingStore;