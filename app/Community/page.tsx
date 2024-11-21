'use client';
import React, { useState } from 'react';

const CommunityPage = () => {
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: 'AI Enthusiasts',
      description: 'Explore AI and ML.',
      members: 120,
    //   image: '',
    },
    {
      id: 2,
      name: 'Web Dev Wizards',
      description: 'Master front-end and back-end.',
      members: 200,
    //   image: '',
    },
    {
      id: 3,
      name: 'Startup Innovators',
      description: 'Brainstorm startup ideas.',
      members: 150,
    //   image: '',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    image: '',
  });

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCommunity = () => {
    if (newCommunity.name && newCommunity.description && newCommunity.image) {
      setCommunities([
        ...communities,
        {
          id: communities.length + 1,
          name: newCommunity.name,
          description: newCommunity.description,
          members: 1,
          image: newCommunity.image,
        },
      ]);
      setNewCommunity({ name: '', description: '', image: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Hero Section */}
      <header className="bg-pink-200 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 hover:scale-105 transition-transform duration-200">
          Discover Your Own Community World
        </h1>
        <p className="text-gray-700 mt-4 text-lg">
          Connect with peers, share knowledge, and grow together.
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
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
        </div>

        {/* Community Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <div
              key={community.id}
              className="bg-white shadow-lg rounded-lg p-4 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold text-pink-600">
                {community.name}
              </h2>
              <p className="text-gray-700 mt-2">{community.description}</p>
              <p className="mt-4 text-sm text-gray-500">
                {community.members} members
              </p>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Community Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-600">
              Create New Community
            </h2>
            <input
              type="text"
              placeholder="Community Name"
              value={newCommunity.name}
              onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
            <textarea
              placeholder="Community Description"
              value={newCommunity.description}
              onChange={(e) =>
                setNewCommunity({ ...newCommunity, description: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
              rows={3}
            ></textarea>
            <input
              type="text"
              placeholder="Community Image URL"
              value={newCommunity.image}
              onChange={(e) => setNewCommunity({ ...newCommunity, image: e.target.value })}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCommunity}
                className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition duration-200"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-pink-100 py-6 text-center mt-12">
        <p className="text-gray-700">
          &copy; 2024 Studify. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default CommunityPage;
