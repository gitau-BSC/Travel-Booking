import { useState, useEffect } from "react";
import Styles from "./style";
import { Navbar, Footer, LoadingSpinner } from "./components";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Results from "./pages/Results";
import Details from "./pages/Details";
import Contact from './pages/Contact';
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/confirmation";
import SeatMap from "./components/SeatMap";
import { ReservationProvider } from './components/contexts/ReservationContext'; 
import BookingList from "./components/BookingList";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const location = useLocation();

  // Scroll to route page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  // Handle search from Home page
  const handleSearch = (data) => {
    setSearchData(data);
  };

  return (
    <ReservationProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar section */}
        <div className={`${Styles.paddingX} ${Styles.flexCenter}`}>
          <div className={`${Styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        
        {/*loading indicator */}
        {loading && <LoadingSpinner />}
        
        {/* Routes - pages */}
        <Routes>
          <Route path="/" element={<Home onSearch={handleSearch} />} />
          <Route path="/about" element={<About />} />
          <Route path="booking" element={<BookingList />} />
          <Route path="/results" element={<Results searchData={searchData} />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/seats" element={<SeatMap />} />
          <Route path="/bookings" element={<BookingList />} />
        </Routes>
        
        {/* Footer */}
        <div className={`bg-primary ${Styles.paddingX} ${Styles.flexCenter}`}>
          <div className={`${Styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      </div>
    </ReservationProvider>
  );
}

export default App;