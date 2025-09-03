import { LoadingSpinner, Hero, Services, FilterSidebar, FareCalculator, SearchForm, SortOptions, BookingList, TopSearch } from "../components";
import { useState, lazy, Suspense, useEffect } from "react";

const LazyTestimonials = lazy(() => import('../components/Testimonials'));

const Home = () => {
  const [searchFilters, setSearchFilters] = useState({});
  const [sortOption, setSortOption] = useState("recommended");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (filters) => {
    setIsSearching(true);
    setSearchFilters(filters);
    // Simulate API call delay
    setTimeout(() => setIsSearching(false), 1500);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Simulates initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  
  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" text="Loading TravelLite..." />
      </div>
    );
  }

  return (
    <div className="space-y-16 w-full min-h-screen pb-16 bg-gray-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-sky-200 to-indigo-200 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
        </div>
      </header>

      {/* Services Section */}
      <section aria-labelledby="services-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Services />
      </section>

      {/* Top Search Section */}
      <section aria-labelledby="top-search-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopSearch onSelectDestination={(destination) => handleSearch({ destination })} />
      </section>

      {/* Main Content*/}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <FilterSidebar onFiltersChange={handleSearch} />
            </div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <FareCalculator />
            </div>
          </aside>
          
          <div className="w-full lg:w-3/4">
            
            {/* Loads SearchForm*/}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
              <SearchForm onSearch={handleSearch} />
              {isSearching && (
                <div className="mt-4 flex items-center justify-center">
                  <LoadingSpinner size="small" text="Searching for trips..." />
                </div>
              )}
            </div>
            
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Available Trips</h2>
              <SortOptions 
                currentOption={sortOption} 
                onOptionChange={handleSortChange} 
              />
            </div>
            
            {/* spinner search */}
            <div className="mb-12">
              {isSearching ? (
                <div className="bg-white rounded-lg shadow p-12 flex items-center justify-center">
                  <LoadingSpinner text="Finding available trips..." />
                </div>
              ) : (
                <BookingList filters={searchFilters} sortOption={sortOption} />
              )}
            </div>
            
            {/* Testimonials */}
            <Suspense fallback={
              <div className="bg-white rounded-lg shadow p-8 flex items-center justify-center">
                <LoadingSpinner text="Loading testimonials..." />
              </div>
            }>
              <section aria-labelledby="testimonials-heading" className="bg-white rounded-lg shadow p-6">
                <LazyTestimonials />
              </section>
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;