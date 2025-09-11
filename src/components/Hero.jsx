import React from 'react';
import SearchForm from './SearchForm';

const Hero = ({ onSearch }) => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Journey</h1>
        <p className="text-xl mb-8">Search across buses, trains, and flights to find the best travel options for your trip</p>
        <SearchForm onSearch={onSearch} />
      </div>
    </section>
  );
};

export default Hero;