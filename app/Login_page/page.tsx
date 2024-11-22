'use client';
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Studify - Login</title> {/* Tab title */}
        <link rel="icon" href="/avatartion.png" type="image/png" /> {/* Favicon */}
      </Head>
      <section className="bg-pink-100">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          {/* Left Section with Image */}
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="avatartion.png"
              className="absolute inset-0 h-full w-full object-cover animate-fadeIn"
            />
          </aside>

          {/* Right Section with Form */}
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl animate-slideInFromLeft">
              {/* Logo */}
              <a className="block text-blue-600" href="#">
                <Image
                  src="book-2-svgrepo-com.svg"
                  width={100}
                  height={100}
                  alt="Home"
                  // className="animate-pulse"
                />
              </a>

              {/* Heading */}
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Studify
              </h1>

              {/* Description */}
              <p className="mt-4 leading-relaxed text-gray-500">
                Connect, collaborate, and grow with fellow students. Log in to
                start networking, sharing ideas, and building your community!
              </p>

              {/* Form */}
              <form
                action="#"
                className="mt-8 grid grid-cols-6 gap-6 animate-fadeIn"
              >
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    name="last_name"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    placeholder="Create your own password"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    placeholder="Confirm your password"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm text-center h-[30px] focus:ring-2 focus:ring-pink-300 transition"
                  />
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a
                      href="#"
                      className="text-red-400 font-semibold no-underline hover:underline transition"
                    >
                      {" "}
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-red-400 font-semibold no-underline hover:underline transition"
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-pink-300 transition"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the privacy policy and terms of service
                    </span>
                  </label>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-[5px]">
                  <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-400 px-12 py-3 text-sm text-white font-semibold transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 animate-bounce"
                  >
                    Create an account
                  </button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0 flex-col gap-[5px]">
                    <span>Already have an account?</span>
                    <a
                      href="#"
                      className="ml-[10px] text-gray-500 w-[200px] h-[200px] text-[25px] font-semibold"
                    >
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
