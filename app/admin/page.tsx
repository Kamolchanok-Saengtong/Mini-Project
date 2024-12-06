'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Correct admin credentials
  const adminEmail = 'IamtherealAdmin@hotmail.com';
  const adminPassword = 'imcreamy12';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      setMessage('Login successful. Redirecting to Name List...');
      setTimeout(() => {
        router.push('/nameList'); // Redirect to the name list page
      }, 2000);
    } else {
      setMessage('404 - You don’t have permission to see this page!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <form
        className="w-full max-w-sm bg-pink-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-pink-800 mb-4 text-center">Admin Login</h2>
        <div className="mb-4">
          <label
            className="block text-pink-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-pink-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log In
        </button>
        {message && <p className="mt-4 text-pink-800 text-center">{message}</p>}
      </form>
    </div>
  );
}
