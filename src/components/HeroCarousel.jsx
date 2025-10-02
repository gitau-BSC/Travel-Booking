import { useState, useEffect } from 'react';

const heroImages = [
  '/images/station (2).jpg', 
  '/images/station (1).jpg', 
  '/images/Madaraka express.jpg', 
  '/images/background2.jpg', 
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Adventure ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}
    </div>
  );
}