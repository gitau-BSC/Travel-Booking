// components/SortOptions.jsx
import React from 'react';

const SortOptions = ({ sortBy, sortOrder, onSortChange }) => {
  const options = [
    { id: 'price', label: 'Price' },
    { id: 'rating', label: 'Rating' },
    { id: 'name', label: 'Name' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <div className="flex space-x-2">
          {options.map(option => (
            <button
              key={option.value}
              className={`px-3 py-1 text-sm rounded-md ${
                sortBy === option.value 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => onSortChange(option.value)}
            >
              {option.label} {sortBy === option.value && (
                sortOrder === 'asc' ? '↑' : '↓'
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortOptions;