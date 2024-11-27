'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CommunityPage = () => {
  const [communities, setCommunities] = useState([
    { id: 1, name: 'AI Enthusiasts', description: 'Explore AI and ML.', members: 120, image: 'cute.jpeg', category: 'Technology' },
    { id: 2, name: 'Web Dev Wizards', description: 'Master front-end and back-end.', members: 200, image: 'flower.jpeg', category: 'Technology' },
    { id: 3, name: 'Startup Innovators', description: 'Brainstorm startup ideas.', members: 150, image: 'icons.jpeg', category: 'Business' },
  ]);


  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    image: '',
    category: '',
  });
  const [visibleCommunities, setVisibleCommunities] = useState(3); // For infinite scroll
  const [isExpanded, setIsExpanded] = useState(false); // For collapsible sections
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For hamburger menu

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setVisibleCommunities((prev) => Math.min(prev + 3, communities.length));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [communities.length]);

  const handleCreateCommunity = () => {
    if (newCommunity.name && newCommunity.description && newCommunity.image && newCommunity.category) {
      setCommunities([
        ...communities,
        {
          id: communities.length + 1,
          name: newCommunity.name,
          description: newCommunity.description,
          members: 1,
          image: newCommunity.image,
          category: newCommunity.category,
        },
      ]);
      setNewCommunity({ name: '', description: '', image: '', category: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col md:flex-row">
      {/* Sidebar */}
<aside
  className={`sticky top-0 bg-pink-100 h-screen w-1/12 p-4 hidden md:block`}
>
  <nav className="space-y-4">
    <a
      href="#featured"
      className="block text-gray-800 hover:underline hover:font-semibold"
    >
      Featured Community
    </a>
    <a
      href="#popular"
      className="block text-gray-800 hover:underline hover:font-semibold"
    >
      Popular Communities
    </a>
    <a
      href="#discussions"
      className="block text-gray-800 hover:underline hover:font-semibold"
    >
      Recent Discussions
    </a>
  </nav>
</aside>


      {/* Hamburger Menu */}
      <div className="md:hidden bg-pink-200 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-pink-100 p-4">
          <a href="#featured" className="block text-gray-800 hover:underline">
            Featured Community
          </a>
          <a href="#popular" className="block text-gray-800 hover:underline">
            Popular Communities
          </a>
          <a href="#discussions" className="block text-gray-800 hover:underline">
            Recent Discussions
          </a>
        </nav>
      )}

      <div className="flex-grow">
        {/* Hero Section */}
        <header className="bg-pink-200 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 hover:scale-105 transition-transform duration-200">
            Discover Your Community World
          </h1>
          <p className="text-gray-700 mt-4 text-lg">
            Connect with peers, share knowledge, and grow together.
          </p>
        </header>

        {/* Featured Community */}
        <section id="featured" className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Community</h2>
          <div className="bg-pink-200 shadow-lg rounded-lg p-6 flex items-center gap-6">
            <img
              src="flower.jpeg"
              alt="Featured Community"
              className="w-32 h-32 rounded-md object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Creative Coders</h3>
              <p className="text-gray-700 mt-2">
                Join our community of developers sharing creative coding ideas!
              </p>
              <button className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-200">
                Join Now
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div id="popular" className="max-w-7xl mx-auto px-6 py-8">
          {/* Search and Create Section */}
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-200"
            >
              + Create Community
            </button>
            <Link
            href="/"
      className="px-4 py-2 bg-pink-500 rounded-full ml-[20px] text-sm text-white font-medium hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-200 md:px-6 md:py-3 md:text-base"
        >
           Home
    </Link>
          </div>

          {/* Community Categories */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Communities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCommunities.slice(0, visibleCommunities).map((community) => (
              <div
                key={community.id}
                className="bg-white shadow-lg rounded-lg p-4 transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold text-pink-600">{community.name}</h2>
                <p className="text-gray-700 mt-2">{community.description}</p>
                <p className="mt-4 text-sm text-gray-500">{community.members} members</p>
                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
                  Join
                </button>
                <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Collapsible Sections */}
          <div className="border-t mt-12 pt-4">
            <button
              className="w-full text-left py-2 text-gray-800 font-bold"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '▼ AI Topics' : '▶ AI Topics'}
            </button>
            {isExpanded && (
              <ul className="pl-4">
                <li className="py-1">Machine Learning Basics</li>
                <li className="py-1">Deep Learning Tools</li>
                <li className="py-1">Neural Network Trends</li>
              </ul>
            )}
          </div>
        </div>

        {/* Recent Discussions */}
        <div id="discussions" className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Recent Discussions</h2>
          <ul className="bg-white shadow rounded-lg p-6 space-y-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-800">How to start with AI projects?</span>
              <button className="text-pink-500 hover:font-semibold">View</button>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-800">Best tools for web development in 2024?</span>
              <button className="text-pink-500 hover:font-semibold">View</button>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-800">Looking for startup collaborators</span>
              <button className="text-pink-500 hover:font-semibold">View</button>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <footer className="bg-pink-100 py-6 text-center mt-12">
          <p className="text-gray-700">&copy; 2024 Studify. All rights reserved.</p>
        </footer>
      </div>

      {/* Create Community Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-xl font-bold mb-4">Create a New Community</h2>
            <input
              type="text"
              placeholder="Community Name"
              value={newCommunity.name}
              onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <textarea
              placeholder="Description"
              value={newCommunity.description}
              onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            ></textarea>
            <input
              type="text"
              placeholder="Image URL"
              value={newCommunity.image}
              onChange={(e) => setNewCommunity({ ...newCommunity, image: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Category"
              value={newCommunity.category}
              onChange={(e) => setNewCommunity({ ...newCommunity, category: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCommunity}
                className="px-4 py-2 bg-pink-500 text-white rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
