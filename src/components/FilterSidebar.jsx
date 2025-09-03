// components/FilterSidebar.jsx
import React from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const handleChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded text-blue-600" 
                onChange={(e) => handleChange('price', e.target.checked ? '0-100' : 'all')}
              />
              <span className="ml-2 text-gray-700">Kes 1500 - Kes2000</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded text-blue-600" 
                onChange={(e) => handleChange('price', e.target.checked ? '100-200' : 'all')}
              />
              <span className="ml-2 text-gray-700">Kes 2000 - Kes2500</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded text-blue-600" 
                onChange={(e) => handleChange('price', e.target.checked ? '200-300' : 'all')}
              />
              <span className="ml-2 text-gray-700">Kes2500 - Kes3000</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded text-blue-600" 
                onChange={(e) => handleChange('price', e.target.checked ? '300+' : 'all')}
              />
              <span className="ml-2 text-gray-700">Kes3000+</span>
            </label>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600" 
                  onChange={(e) => handleChange('rating', e.target.checked ? `${rating}+` : 'all')}
                />
                <span className="ml-2 text-gray-700">{rating}+ stars</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Mode of Transport</h4>
          <div className="space-y-2">
            {['Air', 'Bus', 'Train'].map(type => (
              <label key={type} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600" 
                  onChange={(e) => handleChange('type', e.target.checked ? type : 'all')}
                />
                <span className="ml-2 text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button 
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          onClick={() => onFilterChange({
            service: 'all',
            status: 'all',
            date: ''
          })}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;