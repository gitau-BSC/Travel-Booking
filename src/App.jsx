import { useState, useEffect } from "react";
import Styles from "./style";
import { Navbar, Footer, LoadingSpinner } from "./components";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TestSeatMapPage from "./pages/TestSeatMap";

function App() {
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className={`${Styles.paddingX} ${Styles.flexCenter}`}>
        <div className={`${Styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      
      {/*loading indicator */}
      {loading && <LoadingSpinner />}
      
      {/* Routes - pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/test-seat-map" element={<TestSeatMapPage />} />
      </Routes>
      
      {/* Footer */}
      <div className={`bg-primary ${Styles.paddingX} ${Styles.flexCenter}`}>
        <div className={`${Styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;