'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('You have been logged out successfully!');
        setTimeout(() => {
          router.push('/login'); // Redirect to login page after logout
        }, 2000); // Add a 2-second delay to show the logout success message
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <form
        className="w-full max-w-sm bg-pink-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold text-pink-800 mb-4 text-center">Log Out</h2>
        <p className="text-sm text-pink-700 mb-4 text-center">
          Are you sure you want to log out?
        </p>
        <button
          onClick={handleLogout}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Log Out
        </button>
        {message && <p className="mt-4 text-pink-800 text-center">{message}</p>}
      </form>
    </div>
  );
}
