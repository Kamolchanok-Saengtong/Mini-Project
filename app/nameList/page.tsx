// /pages/nameList.tsx
'use client'
// /pages/nameList.tsx
import { useEffect, useState } from 'react';

const NameListPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch the list of users from your backend or API
    const fetchUsers = async () => {
      const response = await fetch('/api/users'); // Adjust the API route
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  // Function to open the modal and set the selected user
  const openModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-pink-100 py-12 px-4">
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">Customer List (available for Admin)</h1>
        <div className='flex flex-col justify-items items-center mb-[30px]'>
        <img
            alt="Avatar"
            src="Bear.jpeg"
            className="h-[300px] w-[300px] object-cover rounded-full z-10 flex justify-items items-center "
          />
          </div>
        {/* User Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user: any) => (
            <div key={user.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-pink-700">{user.firstName} {user.lastName}</h2>
                <p className="text-pink-500 mb-2">{user.email}</p>
                <div className="mt-4">
                  <button
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
                    onClick={() => openModal(user)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-pink-700 mb-4">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            {/* Add other user information you want to display */}
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameListPage;
