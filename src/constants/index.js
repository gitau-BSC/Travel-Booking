import { FaWifi, FaPlug, FaUserShield, FaCouch, FaFilm,FaSnowflake, FaFacebook, FaLinkedinIn } from 'react-icons/fa';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import DreamlineLogo from '../assets/Dreamline.png';
import SwiftShuttlesLogo from '../assets/swift.png';
import EasyCoachLogo from '../assets/Easycoach.jpg';
import ModernCoastLogo from '../assets/moderncoast.png';
export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "search",
    title: "Book Now",
  },
  {
    id: "routes",
    title: "Popular Routes",
  },
  {
    id: "features",
    title: "Why Choose Us",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const amenities = [
  {
    id: "amenity-1",
    icon: FaCouch, 
    title: "Luxury Travel",
    content: "Experience unparalleled comfort with our fleet of modern, luxury coaches designed for long-distance travel.",
  },
  {
    id: "amenity-2",
    icon: FaUserShield, 
    title: "Safety First",
    content: "Your safety is our priority. Our drivers are highly trained and our vehicles undergo rigorous daily inspections.",
  },
  {
    id: "amenity-3",
    icon: FaWifi,
    title: "Onboard Connectivity",
    content: "Stay connected on the go with complimentary WiFi and charging ports at every seat.",
  },
  {
    id: "amenity-4",
    icon: FaFilm,
    title: "Entertainment",
    content: "Enjoy your journey with personal entertainment systems, featuring movies, music, and games.",
  },
    {
    id: "amenity-5",
    icon: FaPlug, 
    title: "Charging Ports",
    content: "Never run out of battery. USB and AC ports available at every seat.",
  },
  {
    id: "amenity-6",
    icon: FaSnowflake, 
    title: "Air Conditioning",
    content: "Travel in cool, comfortable temperatures throughout your journey.",
  },
];

export const testimonials = [
  {
    id: "testimonial-1",
    content: "The most comfortable ride to Mombasa I've ever had. The online booking was seamless, and the bus was on time and clean. Highly recommend!",
    name: "Wanjiku Mwangi",
    title: "Frequent Traveler",
    img: "/images/person-2 (2).jpg",
    route: "Nairobi to Mombasa"
  },
  {
    id: "testimonial-2",
    content: "I use this service for business every month. The WiFi is reliable enough for me to work, and I always arrive feeling refreshed.",
    name: "David Ochieng",
    title: "Business Consultant",
    img: "/images/person-2 (1).jpg",
    route: "Nairobi to Kisumu"
  },
  {
    id: "testimonial-3",
    content: "As a student, the affordable fares are a lifesaver. The booking process is simple, and I've never had any issues.",
    name: "Amina Ali",
    title: "University Student",
    img: "/images/person-2 (3).jpg",
    route: "Nairobi to Eldoret"
  },
];

export const popularRoutes = [
  {
    id: "route-1",
    origin: "Nairobi",
    destination: "Mombasa",
    price: "KES 1,200+", 
    duration: "6-8 hrs",
    popular: true,
  },
  {
    id: "route-2",
    origin: "Nairobi",
    destination: "Kisumu",
    price: "KES 900+",
    duration: "5-7 hrs",
    popular: true,
  },
  {
    id: "route-3",
    origin: "Nairobi",
    destination: "Kampala",
    price: "UGX 45,000+",
    duration: "12-14 hrs",
    popular: false,
  },
  {
    id: "route-4",
    origin: "Nairobi",
    destination: "Dar es Salaam",
    price: "TZS 35,000+",
    duration: "15-18 hrs",
    popular: false,
  },
  {
    id: "route-5",
    origin: "Mombasa",
    destination: "Dar es Salaam",
    price: "TZS 25,000+",
    duration: "10-12 hrs",
    popular: true,
  },
];

export const footerLinks = [
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        link: "/about",
      },
      {
        name: "How it Works",
        link: "/how-it-works",
      },
      {
        name: "Careers",
        link: "/careers",
      },
      {
        name: "Blog",
        link: "/blog",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        name: "Contact",
        link: "/contact", 
      },
      {
        name: "Help Center",
        link: "/help-center",
      },
      {
        name: "FAQs",
        link: "/faqs",
      },
      {
        name: "Terms of Service",
        link: "/terms-of-service",
      },
      {
        name: "Privacy Policy",
        link: "/privacy-policy",
      },
      {
        name: "Refund Policy",
        link: "/refund-policy",
      },
    ],
  },
  {
    title: "Operators",
    links: [
      {
        name: "List Your Bus",
        link: "/operator-registration",
      },
      {
        name: "Partner Login",
        link: "/operator-login",
      },
    ],
  },
];

export const socialMedia = [
 {
    id: "social-media-1",
    icon: FaFacebook, 
    link: "https://https://www.facebook.com/groups/1112855412075720/",
  },
  {
    id: "social-media-2",
    icon: FaXTwitter, 
    link: "https://x.com/i/flow/login?redirect_after_login=%2Fsearch%3Fq%3D%2523MODERN_COAST%26src%3Dhashtag_click",
  },
  {
    id: "social-media-3",
    icon: FaInstagram,
    link: "https://www.instagram.com/p/CyTbn_OM9Ia/",
  },
  {
    id: "social-media-4",
    icon: FaLinkedinIn, 
    link: "https://www.linkedin.com/company/modern-coast-express-ltd-nakuru/about/",
  },
];

export const partners = [
  {
    id: "partner-1",
    name: "Dreamline Express",
    logo: DreamlineLogo,
  },
  {
    id: "partner-2",
    name: "Swift Shuttles",
    logo: SwiftShuttlesLogo,
  },
  {
    id: "partner-3",
    name: "Easy Coach",
    logo: EasyCoachLogo,
  },
  {
    id: "partner-4",
    name: "Modern Coast",
    logo: ModernCoastLogo,
  },
];

export const popularCities = [
  { id: "city-1", name: "Nairobi", code: "NBO" },
  { id: "city-2", name: "Mombasa", code: "MBA" },
  { id: "city-3", name: "Kisumu", code: "KSM" },
  { id: "city-4", name: "Nakuru", code: "NKU" },
  { id: "city-5", name: "Eldoret", code: "ELD" },
  { id: "city-6", name: "Kampala", code: "KLA" },
  { id: "city-7", name: "Dar es Salaam", code: "DAR" },
  { id: "city-8", name: "Arusha", code: "ARK" },
];