import schedulesData from './schedules.json';

//fetching schedules 
export const fetchSchedules = (origin, destination) => {
  // schedulesData.schedules
  const filteredSchedules = schedulesData.schedules.filter(schedule => {
    return (
      schedule.route.origin.toLowerCase() === origin.toLowerCase() &&
      schedule.route.destination.toLowerCase() === destination.toLowerCase()
    );
  });

  // network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filteredSchedules);
    }, 500);
  });
};

// scheduling by ID
export const fetchScheduleById = (id) => {
  // schedulesData.schedules
  const schedule = schedulesData.schedules.find(s => s.id === id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (schedule) {
        resolve(schedule);
      } else {
        reject(new Error('Schedule not found'));
      }
    }, 300);
  });
};