'use client'
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Basic validation for email and password
  const validateForm = () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.password_confirmation) {
      setError("Please fill all fields.");
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate form before submitting
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully!");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Error occurred during registration.");
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Studify - Login</title>
        <link rel="icon" href="/avatartion.png" type="image/png" />
      </Head>

      <section className="bg-pink-100">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="avatartion.png"
              className="absolute inset-0 h-full w-full object-cover animate-fadeIn"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl animate-slideInFromLeft">
              <a className="block text-blue-600" href="#">
                <Image
                  src="book-2-svgrepo-com.svg"
                  width={100}
                  height={100}
                  alt="Home"
                />
              </a>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Studify
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Connect, collaborate, and grow with fellow students. Log in to
                start networking, sharing ideas, and building your community!
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6 animate-fadeIn"
              >
                {/* First Name */}
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                {/* Last Name */}
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                {/* Email */}
                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                {/* Password */}
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create your own password"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                {/* Password Confirmation */}
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                {/* Error/Success Messages */}
                {error && <div className="col-span-6 text-red-600 text-sm">{error}</div>}
                {success && <div className="col-span-6 text-green-600 text-sm">{success}</div>}

                {/* Submit Button */}
                <div className="col-span-6 sm:flex sm:items-center sm:gap-[5px]">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-400 px-12 py-3 text-sm text-white font-semibold transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 animate-bounce"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create an account"}
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0 flex-col gap-[5px]">
                    <span>Already have an account?</span>
                    <a href="/login" className="ml-[10px] text-gray-500 text-[25px] font-semibold">
                      Log in
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
