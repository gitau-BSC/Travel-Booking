import React, { useState, useMemo, useEffect } from 'react';
import { usePeakType } from '../hooks/usePeakType';
import fareData from '../data/fares.json';

const FareCalculator = () => {
  const [formData, setFormData] = useState({
    operator: '',
    origin: '',
    destination: '',
    passengerType: 'adult',
    departureTime: '08:00'
  });
  const [calculatedFare, setCalculatedFare] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  // selected operator's data
  const operator = fareData.operators[formData.operator];

  // custom hook to determine peak type
  const peakType = usePeakType(operator?.peak_hours, formData.departureTime);

  // origins and destinations based on selected operator
  const availableStations = useMemo(() => {
    if (!operator) return { origins: [], destinations: [] };
    
    if (operator.type === 'train') {
      return {
        origins: operator.zones,
        destinations: operator.zones
      };
    } else {
      // For buses, handle differently
      return {
        origins: operator.routes?.map(route => ({
          id: route.id.split('_')[0],
          name: route.name.split(' to ')[0]
        })) || [],
        destinations: operator.routes?.map(route => ({
          id: route.id.split('_')[1],
          name: route.name.split(' to ')[1]
        })) || []
      };
    }
  }, [operator]);

  // Reset origin and destination when operator changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      origin: '',
      destination: ''
    }));
    setCalculatedFare(null);
    setErrors({});
  }, [formData.operator]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.operator) {
      newErrors.operator = 'Please select a transport type';
    }
    
    if (!formData.origin) {
      newErrors.origin = 'Please select origin';
    }
    
    if (!formData.destination) {
      newErrors.destination = 'Please select destination';
    }
    
    if (formData.origin && formData.destination && formData.origin === formData.destination) {
      newErrors.destination = 'Origin and destination cannot be the same';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateFare = () => {
    if (!validateForm()) return;
    
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      let fareRule;
      
      if (operator.type === 'train') {
        fareRule = operator.fare_rules.find(rule =>
          rule.from_zone === formData.origin && rule.to_zone === formData.destination
        );
      } else {
        fareRule = operator.fare_rules.find(rule =>
          rule.route_id === `${formData.origin}_${formData.destination}`
        );
      }

      if (fareRule && fareRule.fares[peakType]) {
        const price = fareRule.fares[peakType][formData.passengerType];
        setCalculatedFare({
          price,
          currency: fareData.currency,
          peakType,
          operator: operator.name,
          passengerType: formData.passengerType
        });
      } else {
        setCalculatedFare({ error: 'No fare found for this route. Please try different stations.' });
      }
      
      setIsCalculating(false);
    }, 500);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (calculatedFare) {
      setCalculatedFare(null);
    }
  };

  const passengerTypeLabels = {
    adult: 'Adult',
    child: 'Child',
    student: 'Student'
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Fare Calculator</h2>
      
      {/* Operator Selection */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Transport
        </label>
        <select
          value={formData.operator}
          onChange={(e) => handleInputChange('operator', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.operator ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={!!errors.operator}
          aria-describedby={errors.operator ? 'operator-error' : undefined}
        >
          <option value="">Choose transport...</option>
          {Object.entries(fareData.operators).map(([id, op]) => (
            <option key={id} value={id}>
              {op.name}
            </option>
          ))}
        </select>
        {errors.operator && (
          <p id="operator-error" className="mt-1 text-sm text-red-600">{errors.operator}</p>
        )}
      </div>

      {/* Origin and Destination */}
      {operator && (
        <>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              value={formData.origin}
              onChange={(e) => handleInputChange('origin', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.origin ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.origin}
              aria-describedby={errors.origin ? 'origin-error' : undefined}
            >
              <option value="">Select origin...</option>
              {availableStations.origins.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
            {errors.origin && (
              <p id="origin-error" className="mt-1 text-sm text-red-600">{errors.origin}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.destination ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.destination}
              aria-describedby={errors.destination ? 'destination-error' : undefined}
            >
              <option value="">Select destination...</option>
              {availableStations.destinations.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
            {errors.destination && (
              <p id="destination-error" className="mt-1 text-sm text-red-600">{errors.destination}</p>
            )}
          </div>
        </>
      )}

      {/* Passenger Type and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Passenger Type
          </label>
          <select
            value={formData.passengerType}
            onChange={(e) => handleInputChange('passengerType', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departure Time
          </label>
          <input
            type="time"
            value={formData.departureTime}
            onChange={(e) => handleInputChange('departureTime', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateFare}
        disabled={isCalculating || !formData.origin || !formData.destination}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
      >
        {isCalculating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Calculating...
          </>
        ) : (
          'Calculate Fare'
        )}
      </button>

      {/* Results Display */}
      {calculatedFare && (
        <div className={`mt-6 p-5 rounded-xl ${
          calculatedFare.error ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
        }`}>
          {calculatedFare.error ? (
            <div className="flex items-start">
              <svg className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-700">{calculatedFare.error}</p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Fare Estimate</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-3xl font-bold text-blue-900 mr-2">
                  {calculatedFare.price} {calculatedFare.currency}
                </span>
                <span className="text-sm text-blue-700">
                  {passengerTypeLabels[calculatedFare.passengerType]}
                </span>
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="capitalize">{calculatedFare.peakType.replace('_', ' ')} Hours</span>
              </div>
              <p className="text-sm text-blue-600 mt-2">{calculatedFare.operator}</p>
            </>
          )}
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Fares are estimates and may vary based on actual travel conditions
      </p>
    </div>
  );
};

export default FareCalculator;