// src/hooks/usePeakType.js
import { useMemo } from 'react';

const isTimeBetween = (time, startTime, endTime) => {
  const [timeHours, timeMinutes] = time.split(':').map(Number);
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const totalMinutes = timeHours * 60 + timeMinutes;
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  return totalMinutes >= startTotalMinutes && totalMinutes <= endTotalMinutes;
};

export const usePeakType = (operatorPeakHours, departureTime) => {
  return useMemo(() => {
    if (!operatorPeakHours || !departureTime) return 'off_peak';

    for (const [peakType, timeRanges] of Object.entries(operatorPeakHours)) {
      for (const range of timeRanges) {
        const [start, end] = range.split('-');
        if (isTimeBetween(departureTime, start, end)) {
          return peakType;
        }
      }
    }
    return 'off_peak';
  }, [operatorPeakHours, departureTime]);
};