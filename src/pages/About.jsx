import { Link } from "react-router-dom";
import { FaUsers, FaShieldAlt, FaClock, FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/images/team/sarah.jpg",
      bio: "10+ years in travel industry"
    },
    {
      name: "Michael G. Walter",
      role: "CTO",
      image: "/images/team/Michael.jpg",
      bio: "Tech innovation expert"
    },
    {
      name: "Amina Mohammed",
      role: "Customer Experience",
      image: "/images/team/Amina1.jpg",
      bio: "Passionate about user satisfaction"
    },
    {
      name: "David Kimani",
      role: "Operations Manager",
      image: "/images/team/David.jpg",
      bio: "Logistics and efficiency specialist"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "15+", label: "Years Experience" },
    { number: "100+", label: "Destinations" },
    { number: "24/7", label: "Customer Support" }
  ];

  const values = [
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Reliability",
      description: "We ensure safe and dependable travel experiences for all our customers."
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "Efficiency",
      description: "Quick bookings, timely departures, and smooth travel experiences."
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Care",
      description: "We treat every customer like family and prioritize your comfort."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-300 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Travellite</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your trusted partner in seamless travel experiences across Kenya and beyond. 
            We're committed to making your journey comfortable, reliable, and memorable.
          </p>
          <Link
            to="/details/1"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Book Your Trip
          </Link>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Travellite started as a small family business with a single bus 
                operating between Nairobi and Mombasa. Our founder, Sarah Johnson, believed that 
                travel should be accessible, comfortable, and reliable for everyone.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we've grown into one of Kenya's leading transportation providers, serving 
                over 50,000 satisfied customers annually. Despite our growth, we've maintained 
                our commitment to personalized service and quality experiences.
              </p>
              <p className="text-gray-600">
                Our mission is simple: to connect people and places through safe, affordable, 
                and comfortable transportation while contributing positively to the communities we serve.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
                alt="Our modern fleet"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <FaUsers className="w-12 h-12 text-blue-600 mr-4" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">15+ Years</p>
                    <p className="text-gray-600">Of trusted service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Team Section */}
<section className="bg-gray-100 py-20">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Meet Our Team</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden text-center team-member-card">
          {/* image container */}
          <div className="h-48 relative">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-20">
              <FaUsers className="w-16 h-16 text-white" />
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <p className="text-blue-600 mb-2">{member.role}</p>
            <p className="text-sm text-gray-600">{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  </section>

      {/* Commitment Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-blue-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Commitment to You</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              We're dedicated to providing the highest standards of safety, comfort, and reliability. 
              Your satisfaction is our top priority, and we continuously work to improve our services 
              based on your feedback.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <FaShieldAlt className="w-6 h-6 mr-2" />
                <span>Safety First</span>
              </div>
              <div className="flex items-center">
                <FaClock className="w-6 h-6 mr-2" />
                <span>On-Time Guarantee</span>
              </div>
              <div className="flex items-center">
                <FaHeart className="w-6 h-6 mr-2" />
                <span>Customer Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-gray-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaPhone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-blue-200">+254 700 123 456</p>
              <p className="text-sm text-gray-400">24/7 Customer Support</p>
            </div>
            <div className="text-center">
              <FaEnvelope className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-blue-200">info@travellite.com</p>
              <p className="text-sm text-gray-400">We respond within 24 hours</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-blue-200">Nairobi Central Business District</p>
              <p className="text-sm text-gray-400">Mon-Fri, 8AM-6PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Travel with Us?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of satisfied customers who trust TravelEase for their journeys
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Your Trip Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;