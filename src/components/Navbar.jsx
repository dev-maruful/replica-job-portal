"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side - Logo */}
        <div>
          <Link href="/" className="text-white font-bold text-xl">
            Job Portal
          </Link>
        </div>

        {/* Middle - Categories */}
        <div className="hidden md:flex space-x-4">
          {/* Add your categories links here */}
          <Link href="/category1" className="text-white">
            Category 1
          </Link>
          <Link href="/category2" className="text-white">
            Category 2
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Check if user is logged in */}
          {isLoggedIn ? (
            <>
              {/* User's photo */}
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex text-white items-center focus:outline-none"
                >
                  {/* Replace 'userPhotoUrl' with the actual URL of the user's photo */}
                  <img
                    src="userPhotoUrl"
                    alt="User's Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {/* Dropdown menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 bg-white border rounded shadow-lg">
                    {/* Add dropdown menu items here */}
                    <Link href="/profile">
                      <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                        Profile
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // If the user is not logged in, show the login button
            <Link href="/login">
              <span className="text-white cursor-pointer">Login</span>
            </Link>
          )}
        </div>
      </div>
      {/* Responsive menu for smaller devices */}
      <div className="md:hidden mt-4">
        <button
          onClick={toggleMenu}
          className="text-white font-bold text-xl focus:outline-none"
        >
          <svg
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path d="M19 15H5v-2h14v2zM19 9H5V7h14v2z" />
            ) : (
              <path d="M4 8h16v2H4zm0 5h16v2H4z" />
            )}
          </svg>
        </button>
        {isMenuOpen && (
          <div className="mt-2">
            {/* Add your responsive menu items here */}
            <Link href="/category1">
              <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer">
                Category 1
              </span>
            </Link>
            <Link href="/category2">
              <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer">
                Category 2
              </span>
            </Link>
            {/* Add the login button to the responsive menu */}
            {!isLoggedIn && (
              <Link href="/login">
                <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer">
                  Login
                </span>
              </Link>
            )}
            {/* Add other responsive menu items */}
            {isLoggedIn && (
              <>
                <Link href="/profile">
                  <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer">
                    Profile
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 text-white hover:bg-gray-700 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
