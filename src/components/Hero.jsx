import React from 'react';

const Hero = () => {
  return (
    <section 
      className="relative bg-cover bg-center text-white py-16 h-[70vh] flex items-center" 
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Find and book the best travel experiences with ease. Explore destinations worldwide.
        </p>
        <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow hover:bg-yellow-400 transition duration-300">
          Start Exploring
        </button>
      </div>
    </section>
  );
};

export default Hero;