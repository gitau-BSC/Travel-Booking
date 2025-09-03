import { useEffect, useState } from 'react';
import SeatMap from '../components/SeatMap';
import { fetchScheduleById } from '../data/mockData'; 

const TestSeatMapPage = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch a schedule to test with when page loads
  useEffect(() => {
    const loadSchedule = async () => {
      // sample id - schedules.json
      const testSchedule = await fetchScheduleById('SCH065');
      setSchedule(testSchedule);
      setLoading(false);
    };
    loadSchedule();
  }, []);

  if (loading) {
    return <div className="p-8">Loading test schedule...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Testing the SeatMap Component</h1>
      <SeatMap schedule={schedule} />
    </div>
  );
};

export default TestSeatMapPage;