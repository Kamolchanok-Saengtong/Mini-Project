'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CommunityPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [tags, setTags] = useState({});

  // Fetch Reddit data
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) return; // Fetch after 2+ chars
      const response = await fetch(`https://www.reddit.com/r/technology/search.json?q=${query}&restrict_sr=on`);
      if (!response.ok) {
        console.error("Failed to fetch data");
        return;
      }
      const data = await response.json().catch((error) => console.error("Error parsing JSON:", error));
      if (data) {
        const posts = data?.data?.children?.map((post) => ({
          id: post.data.id,
          title: post.data.title,
          url: post.data.url,
        }));
        setResults(posts || []);
      }
    };

    fetchResults();
  }, [query]);

  // Fetch user's favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites');
        if (!response.ok) {
          console.error("Failed to fetch favorites, status:", response.status);
          return;
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const addToFavorites = (post) => {
    const newFavorite = { ...post, id: Date.now().toString(), tag: '' }; // Simulate a new favorite with a unique id
    setFavorites([...favorites, newFavorite]);
  };

  const deleteFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const handleTagChange = (id, tag) => {
    setTags((prevTags) => ({ ...prevTags, [id]: tag }));
  };

  const saveTag = (id) => {
    const updatedFavorites = favorites.map((fav) =>
      fav.id === id ? { ...fav, tag: tags[id] } : fav // Set the tag for the favorite
    );
    setFavorites(updatedFavorites); // Update the state with the updated tag
    console.log(`Tag saved for favorite ${id}:`, tags[id]);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-pink-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
          <h1 className="text-2xl font-bold">Tech Community</h1>
          </Link>
          <nav>
            <ul className="flex gap-4">
              <li><a href="/" className="hover:text-pink-200">Home</a></li>
              <li><a href="/University" className="hover:text-pink-200">University</a></li>
              <li><a href="/admin" className="hover:text-pink-200">For Admin only</a></li>

            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-pink-100 p-8 text-center text-white h-[300px] flex flex-col items-center justify-center">
        <img
          alt="Avatar"
          src="cute.jpeg"
          className="h-[200px] w-[200px] object-cover rounded-full mb-4 mt-3"
        />
        <h1 className="text-4xl font-bold text-pink-600">Explore Technology Community</h1>
        <p className="mt-2 text-lg text-gray-800">Find the latest discussions and add your favorites!</p>
      </section>

      {/* Search Bar Section */}
      <div className="flex justify-center px-6 py-4">
        <input
          type="text"
          placeholder="Search technology topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-xl border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Search Results Section */}
      <div className="container mx-auto px-6">
        {results.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline mb-4"
                  >
                    Read More
                  </a>
                  <button
                    onClick={() => addToFavorites({ title: post.title, url: post.url, tag: '' })}
                    className="mt-auto bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600"
                  >
                    + Add to Favorites
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Favorites Section */}
      <div className="container mx-auto px-6 py-4 mt-8">
        {favorites.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Favorites</h2>
            <div className="space-y-4">
              {favorites.map((fav) => (
                <div key={fav.id} className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-between">
                  <a
                    href={fav.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline flex-1"
                  >
                    {fav.title}
                  </a>
                  <input
                    type="text"
                    value={tags[fav.id] || fav.tag}
                    onChange={(e) => handleTagChange(fav.id, e.target.value)}
                    className="w-32 p-2 rounded-md border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Add a tag"
                  />
                  <button
                    onClick={() => saveTag(fav.id)}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 ml-2"
                  >
                    Add Tag
                  </button>
                  <button
                    onClick={() => deleteFavorite(fav.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                  {fav.tag && (
                    <span className="bg-pink-200 text-pink-600 py-1 px-2 rounded-full ml-4">{fav.tag}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer id="about" className="bg-pink-600 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Tech Community. All rights reserved.</p>
          <p className="text-sm mt-1">Built with ❤️ by Creamy</p>
        </div>
      </footer>
    </div>
  );
}




//  'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// const CommunityPage = () => {
//   const [communities, setCommunities] = useState([
//     { id: 1, name: 'AI Enthusiasts', description: 'Explore AI and ML.', members: 120, image: 'cute.jpeg', category: 'Technology' },
//     { id: 2, name: 'Web Dev Wizards', description: 'Master front-end and back-end.', members: 200, image: 'flower.jpeg', category: 'Technology' },
//     { id: 3, name: 'Startup Innovators', description: 'Brainstorm startup ideas.', members: 150, image: 'icons.jpeg', category: 'Business' },
//   ]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newCommunity, setNewCommunity] = useState({
//     name: '',
//     description: '',
//     image: '',
//     category: '',
//   });
//   const [visibleCommunities, setVisibleCommunities] = useState(3); // For infinite scroll
//   const [isExpanded, setIsExpanded] = useState(false); // For collapsible sections
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // For hamburger menu

//   const filteredCommunities = communities.filter((community) =>
//     community.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Handle infinite scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         setVisibleCommunities((prev) => Math.min(prev + 3, communities.length));
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [communities.length]);

//   const handleCreateCommunity = () => {
//     if (newCommunity.name && newCommunity.description && newCommunity.image && newCommunity.category) {
//       setCommunities([
//         ...communities,
//         {
//           id: communities.length + 1,
//           name: newCommunity.name,
//           description: newCommunity.description,
//           members: 1,
//           image: newCommunity.image,
//           category: newCommunity.category,
//         },
//       ]);
//       setNewCommunity({ name: '', description: '', image: '', category: '' });
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-pink-50 flex flex-col md:flex-row">
//       {/* Sidebar */}
// <aside
//   className={`sticky top-0 bg-pink-100 h-screen w-1/12 p-4 hidden md:block`}
// >
//   <nav className="space-y-4">
//     <a
//       href="#featured"
//       className="block text-gray-800 font-semibold hover:underline hover:font-semibold"
//     >
//       Featured Community
//     </a>
//     <a
//       href="#popular"
//       className="block text-gray-800 font-semibold hover:underline hover:font-semibold"
//     >
//       Popular Communities
//     </a>
//     <a
//       href="#discussions"
//       className="block text-gray-800 font-semibold hover:underline hover:font-semibold"
//     >
//       Recent Discussions
//     </a>
//   </nav>
// </aside>


//       {/* Hamburger Menu */}
//       <div className="md:hidden bg-pink-200 p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-gray-800 focus:outline-none"
//           aria-label="Toggle Menu"
//         >
//           <svg
//             className="w-6 h-6"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             {isMenuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             )}
//           </svg>
//         </button>
//       </div>

//       {isMenuOpen && (
//         <nav className="md:hidden bg-pink-100 p-4">
//           <a href="#featured" className="block text-gray-800 hover:underline">
//             Featured Community
//           </a>
//           <a href="#popular" className="block text-gray-800 hover:underline">
//             Popular Communities
//           </a>
//           <a href="#discussions" className="block text-gray-800 hover:underline">
//             Recent Discussions
//           </a>
//         </nav>
//       )}

//       <div className="flex-grow">
//         {/* Hero Section */}
//         <header className="bg-pink-200 py-32 text-center ">
//           <div className='flex justify-center items-center'>
//         <img
//             alt="Avatar"
//             src="cute.jpeg"
//             className="h-[300px] w-[300px] object-cover rounded-full z-10 flex justify-center items-center "
//           />
//           </div>
//           <h1 className="text-4xl mt-[30px] font-bold text-gray-800 hover:scale-105 transition-transform duration-200">
//             Discover Your Community World
//           </h1>
//           <p className="text-gray-700 mt-4 text-lg">
//             Connect with peers, share knowledge, and grow together.
//           </p>
//         </header>

//         {/* Featured Community */}
//         <section id="featured" className="max-w-7xl mx-auto px-6 py-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Community</h2>
//           <div className="bg-pink-200 shadow-lg rounded-lg p-6 flex items-center gap-6">
//             <img
//               src="flower.jpeg"
//               alt="Featured Community"
//               className="w-32 h-32 rounded-md object-cover"
//             />
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800">Creative Coders</h3>
//               <p className="text-gray-700 mt-2">
//                 Join our community of developers sharing creative coding ideas!
//               </p>
//               <button className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-200">
//                 Join Now
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Main Content */}
//         <div id="popular" className="max-w-7xl mx-auto px-6 py-8">
//           {/* Search and Create Section */}
//           <div className="flex justify-between items-center mb-8">
//             <input
//               type="text"
//               placeholder="Search communities..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
//             />
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="ml-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-200"
//             >
//               + Create Community
//             </button>
//             <Link
//             href="/"
//       className="px-4 py-2 bg-pink-500 rounded-full ml-[20px] text-sm text-white font-medium hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-200 md:px-6 md:py-3 md:text-base"
//         >
//            Home
//     </Link>
//           </div>

//           {/* Community Categories */}
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Communities</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {filteredCommunities.slice(0, visibleCommunities).map((community) => (
//               <div
//                 key={community.id}
//                 className="bg-white shadow-lg rounded-lg p-4 transition-transform duration-200 hover:scale-105"
//               >
//                 <img
//                   src={community.image}
//                   alt={community.name}
//                   className="w-full h-40 object-cover rounded-md mb-4"
//                 />
//                 <h2 className="text-2xl font-semibold text-pink-600">{community.name}</h2>
//                 <p className="text-gray-700 mt-2">{community.description}</p>
//                 <p className="mt-4 text-sm text-gray-500">{community.members} members</p>
//                 <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
//                   Join
//                 </button>
//                 <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Collapsible Sections */}
//           <div className="border-t mt-12 pt-4">
//             <button
//               className="w-full text-left py-2 text-gray-800 font-bold"
//               onClick={() => setIsExpanded(!isExpanded)}
//             >
//               {isExpanded ? '▼ What you should learn today?🎀✨' : '▶ AI Topics'}
//             </button>
//             {isExpanded && (
//               <ul className="pl-4">
//                 <li className="py-1">Machine Learning Basics</li>
//                 <li className="py-1">Deep Learning Tools</li>
//                 <li className="py-1">Neural Network Trends</li>
//               </ul>
//             )}
//           </div>
//         </div>

//         {/* Recent Discussions */}
//         <div id="discussions" className="max-w-7xl mx-auto px-6 py-8">
//           <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Recent Discussions</h2>
//           <ul className="bg-white shadow rounded-lg p-6 space-y-4">
//             <li className="flex justify-between items-center">
//               <span className="text-gray-800">How to start with AI projects?</span>
//               <a href="https://medium.com/@sadafsaleem5815/comprehensive-guide-to-starting-your-ai-project-from-idea-to-implementation-7a819b19e9bb" className="text-pink-500 hover:font-semibold">View</a>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-800">Best tools for web development in 2024?</span>
//               <a href="https://www.designrush.com/agency/web-development-companies/trends/web-development-tools" className="text-pink-500 hover:font-semibold">View</a>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-800">Looking for startup collaborators</span>
//               <a href="https://www.linkedin.com/advice/3/how-can-you-identify-potential-partners-collaborators-lmcpc" className="text-pink-500 hover:font-semibold">View</a>
//             </li>
//           </ul>
//         </div>

//         {/* Footer */}
//         <footer className="bg-pink-100 py-6 text-center mt-12">
//           <p className="text-gray-700">&copy; 2024 Studify. All rights reserved.</p>
//         </footer>
//       </div>

//       {/* Create Community Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-md w-1/2">
//             <h2 className="text-xl font-bold mb-4">Create a New Community</h2>
//             <input
//               type="text"
//               placeholder="Community Name"
//               value={newCommunity.name}
//               onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
//               className="w-full mb-4 p-2 border rounded-md"
//             />
//             <textarea
//               placeholder="Description"
//               value={newCommunity.description}
//               onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
//               className="w-full mb-4 p-2 border rounded-md"
//             ></textarea>
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={newCommunity.image}
//               onChange={(e) => setNewCommunity({ ...newCommunity, image: e.target.value })}
//               className="w-full mb-4 p-2 border rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Category"
//               value={newCommunity.category}
//               onChange={(e) => setNewCommunity({ ...newCommunity, category: e.target.value })}
//               className="w-full mb-4 p-2 border rounded-md"
//             />
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreateCommunity}
//                 className="px-4 py-2 bg-pink-500 text-white rounded-md"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommunityPage;


// 'use client'
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function CommunityPage() {
//   const [communities, setCommunities] = useState([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [category, setCategory] = useState('');
//   const [editId, setEditId] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCommunities = async () => {
//       const res = await fetch('/api/communities');
//       const data = await res.json();
//       setCommunities(data);
//     };
//     fetchCommunities();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const communityData = {
//       name,
//       description,
//       image,
//       category,
//     };

//     if (editId) {
//       // Update community
//       await fetch(`/api/communities/${editId}`, {
//         method: 'PUT',
//         body: JSON.stringify(communityData),
//       });
//     } else {
//       // Create new community
//       await fetch('/api/communities', {
//         method: 'POST',
//         body: JSON.stringify(communityData),
//       });
//     }

//     setName('');
//     setDescription('');
//     setImage('');
//     setCategory('');
//     setEditId(null);

//     // Refresh the community list
//     const res = await fetch('/api/communities/route.ts');
//     const data = await res.json();
//     setCommunities(data);
//   };

//   const handleEdit = (community) => {
//     setName(community.name);
//     setDescription(community.description);
//     setImage(community.image);
//     setCategory(community.category);
//     setEditId(community.id);
//   };

//   const handleDelete = async (id) => {
//     await fetch(`/api/communities/${id}`, {
//       method: 'DELETE',
//     });
//     // Refresh the community list
//     const res = await fetch('/api/communities');
//     const data = await res.json();
//     setCommunities(data);
//   };

//   return (
//     <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6">
//       <h1 className="text-4xl font-bold text-pink-600 mb-8">Community Forum</h1>

//       {/* Create/Edit Form */}
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-8">
//         <h2 className="text-2xl font-semibold text-pink-600 mb-4">
//           {editId ? 'Edit Community' : 'Create Community'}
//         </h2>
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Community Name"
//             className="w-full p-3 border border-pink-300 rounded-lg"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Description"
//             className="w-full p-3 border border-pink-300 rounded-lg"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             className="w-full p-3 border border-pink-300 rounded-lg"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             className="w-full p-3 border border-pink-300 rounded-lg"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-pink-600 text-white p-3 rounded-lg"
//           >
//             {editId ? 'Update Community' : 'Create Community'}
//           </button>
//         </div>
//       </form>

//       {/* Communities List */}
//       <div className="w-full max-w-4xl space-y-6">
//         {communities.map((community) => (
//           <div key={community.id} className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-2xl font-semibold text-pink-600">{community.name}</h3>
//                 <p className="text-sm text-gray-600">{community.description}</p>
//                 <p className="text-sm text-pink-500">{community.category}</p>
//               </div>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => handleEdit(community)}
//                   className="text-pink-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(community.id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }