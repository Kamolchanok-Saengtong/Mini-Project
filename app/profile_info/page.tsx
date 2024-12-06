'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      const response = await fetch('/api/personal_info');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  };

  const handleUpdate = async () => {
    await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id: editingUser }),
    });
    setEditingUser(null);
    router.refresh(); // Refresh the page to get updated data
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await fetch('/api/user', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      router.refresh(); // Refresh the page to get updated data
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!session || session.user.role !== 'admin') {
    return <p>You must be an admin to view this page.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border px-4 py-2 w-full"
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
