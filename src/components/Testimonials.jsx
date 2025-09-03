import React, { useState } from 'react';

const Testimonials = () => {
  const [testimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "/images/woman.jpg",
      rating: 5,
      text: "The booking process was incredibly smooth and the customer service was exceptional. My room was exactly as described and the location was perfect for my business meetings.",
      date: "June 15, 2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Family Vacationer",
      image: "/images/man2.jpg",
      rating: 4,
      text: "We had a wonderful family vacation thanks to the excellent recommendations and seamless booking experience. The property exceeded our expectations!",
      date: "July 22, 2025"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Honeymooner",
      image: "/images/woman1.jpg",
      rating: 5,
      text: "Our honeymoon was absolutely perfect! The booking site made it so easy to find romantic getaways, and the customer support team helped us with special requests.",
      date: "August 5, 2025"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Adventure Traveler",
      image: "/images/man.jpg",
      rating: 5,
      text: "I've used many booking sites, but this one stands out for its intuitive interface and detailed filters. Found exactly what I was looking for in minutes!",
      date: "September 12, 2025"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of travellers trust us for their booking needs
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden testimonial-card hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-gray-500 text-sm">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 bg-white rounded-full p-3 shadow-md hover:bg-indigo-50 transition-colors duration-200 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 bg-white rounded-full p-3 shadow-md hover:bg-indigo-50 transition-colors duration-200 focus:outline-none"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-3 w-3 rounded-full mx-1 ${
                index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;