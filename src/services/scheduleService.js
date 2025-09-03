import schedulesData from '../../data/schedules.json';
import operatorsData from '../../data/operators.json';
import routesData from '../../data/routes.json';
import citiesData from '../../data/cities.json';

// Helper function to enrich schedule data with related information
const enrichScheduleData = (schedule) => {
  // Get operator details
  const operator = operatorsData.operators.find(op => op.id === schedule.operator.id);
  
  // Get route details
  const route = routesData.routes.find(r => r.id === schedule.route.id);
  
  // Get city details for each stop
  const stopsWithDetails = schedule.stops.map(stop => {
    const city = citiesData.cities.find(c => c.name === stop.name);
    return {
      ...stop,
      cityInfo: city || null
    };
  });
  
  return {
    ...schedule,
    operator: {
      ...schedule.operator,
      details: operator || null
    },
    route: {
      ...schedule.route,
      details: route || null
    },
    stops: stopsWithDetails
  };
};

export const scheduleService = {
  // Get all schedules with enriched data
  getSchedules: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return schedulesData.schedules.map(enrichScheduleData);
  },
  
  // Get schedule by ID with enriched data
  getScheduleById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const schedule = schedulesData.schedules.find(s => s.id === id);
    return schedule ? enrichScheduleData(schedule) : null;
  },
  
  // Get filter options
  getFilterOptions: async () => {
    const operators = [...new Set(schedulesData.schedules.map(s => s.operator.name))];
    const busTypes = [...new Set(schedulesData.schedules.map(s => s.bus.type))];
    
    return {
      operators: ['All', ...operators],
      busTypes: ['All', ...busTypes],
      timeWindows: ['All Day', 'Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)']
    };
  },
  
  // Search schedules with filters
  searchSchedules: async (filters) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    let results = schedulesData.schedules.map(enrichScheduleData);
    
    // Apply filters
    if (filters.operator !== 'All') {
      results = results.filter(s => s.operator.name === filters.operator);
    }
    
    if (filters.busType !== 'All') {
      results = results.filter(s => s.bus.type === filters.busType);
    }
    
    // Apply time window filter
    if (filters.timeWindow !== 'All Day') {
      results = results.filter(s => {
        const hour = parseInt(s.timing.departure.split('T')[1].split(':')[0]);
        if (filters.timeWindow.includes('Morning')) return hour >= 6 && hour < 12;
        if (filters.timeWindow.includes('Afternoon')) return hour >= 12 && hour < 18;
        if (filters.timeWindow.includes('Evening')) return hour >= 18 || hour < 6;
        return true;
      });
    }
    
    return results;
  },
  
  // Get schedules by route
  getSchedulesByRoute: async (origin, destination) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return schedulesData.schedules
      .filter(s => s.route.origin === origin && s.route.destination === destination)
      .map(enrichScheduleData);
  },
  
  // Get cities
  getCities: async () => {
    return citiesData.cities;
  }
};