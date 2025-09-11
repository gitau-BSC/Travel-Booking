import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ compact = false, placeholder = "Enter destination...", onSearch }) => {
  const [query, setQuery] = useState("");
  const [transportType, setTransportType] = useState("all");
  const [passengers, setPassengers] = useState(1);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // search data prep
    const searchData = {
      query,
      transportType,
      passengers,
      departureDate,
      returnDate
    };
    
    // Passing data to parent component
    if (onSearch) {
      onSearch(searchData);
    }
    
    // results page navigation
    navigate("/results");
  };

  return (
    <div className="search-form-container">
      <form 
        className={`search-form ${compact ? "compact-search" : ""}`} 
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit" className="search-button">
          {compact ? <i className="fas fa-search"></i> : "Search Trips"}
        </button>
      </form>
      
      {!compact && (
        <div className="advanced-options">
          <div className="options-grid">
            <div className="option-group">
              <label htmlFor="transport-type">Transport Type</label>
              <select 
                id="transport-type"
                value={transportType}
                onChange={(e) => setTransportType(e.target.value)}
              >
                <option value="all">All Transports</option>
                <option value="bus">Buses</option>
                <option value="train">Trains</option>
                <option value="flight">Flights</option>
              </select>
            </div>
            
            <div className="option-group">
              <label htmlFor="passengers">Passengers</label>
              <select 
                id="passengers"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4+ Passengers</option>
              </select>
            </div>
            
            <div className="option-group">
              <label htmlFor="date">Departure Date</label>
              <input 
                type="date" 
                id="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </div>
            
            <div className="option-group">
              <label htmlFor="return-date">Return Date (Optional)</label>
              <input 
                type="date" 
                id="return-date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;