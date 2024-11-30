'use client';

import { useState, useEffect } from 'react';

export default function UniversitySearch() {
  const [query, setQuery] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    // Trigger the hero animation after the component mounts
    const timeout = setTimeout(() => setShowHero(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      const fetchUniversities = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://universities.hipolabs.com/search?name=${query}`);
          const data = await response.json();
          setUniversities(data);
        } catch (error) {
          console.error('Error fetching universities:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUniversities();
    } else {
      setUniversities([]); // Clear results if query is too short
    }
  }, [query]);

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-pink-100 shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="/" className="text-pink-700 text-2xl font-bold">Studify</a>
          <ul className="flex space-x-4 text-pink-600">
            <li>
              <a href="/" className="hover:text-pink-900 transition">Home</a>
            </li>
            <li>
              <a href="/community" className="hover:text-pink-900 transition">Find your community</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        id="hero"
        className={`relative bg-cover bg-center bg-no-repeat flex flex-col items-center text-center py-40 px-6 transition-all duration-1000 ease-in-out ${
          showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          backgroundImage: "url('/wallpaper.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-pink-200 bg-opacity-60"></div>
        <h2 className="relative text-5xl font-bold text-pink-800 mb-4">Find Your Dream University</h2>
        <img
            alt="Avatar"
            src="Bear.jpeg"
            className="h-[300px] w-[300px] object-cover rounded-full z-10 "
          />
        <p className="relative text-pink-600 text-lg max-w-3xl">
          Explore universities from all over the world, connect with your dream institution, and
          take the first step toward your future.
        </p>
        <a
          href="/Login_page"
          className="relative mt-6 bg-pink-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-800 transition"
        >
          Register now! If you haven't done yet!!
        </a>
      </header>

      {/* Search Section */}
      <main id="search" className="flex-1 py-10 px-6">
        <h1 className="text-4xl font-bold text-pink-700 text-center mb-6">
          University Search Engine
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type university name..."
            className="w-full max-w-md px-4 py-2 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <p className="text-pink-600 text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {/* University Cards */}
            {universities.length > 0 ? (
              universities.map((uni) => (
                <div
                  key={uni.name}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-transform"
                >
                  <h3 className="text-lg font-bold text-pink-700 mb-2">{uni.name}</h3>
                  <p className="text-pink-600">Country: {uni.country}</p>
                  <a
                    href={uni.web_pages[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 underline mt-2 inline-block hover:text-pink-700"
                  >
                    Visit Website
                  </a>
                </div>
              ))
            ) : (
              <p className="text-pink-600 text-center col-span-full">
                No universities found. Try another search!
              </p>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer id="about" className="bg-pink-100 py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-pink-700 mb-4">About Studify</h2>
          <p className="text-pink-600 text-lg">
            Studify is a platform dedicated to helping students worldwide discover educational
            opportunities. Whether you're looking for top universities or hidden gems, we're here to
            support your academic journey.
          </p>
        </div>
      </footer>
    </div>
  );
}
