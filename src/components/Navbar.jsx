"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import GetCurrentUser from "@/utils/getCurrentUser";
import UserLogin from "@/utils/userLogin";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [currentUser, setCurrentUser] = useState({});
  const { data: currentUser, refetch } = GetCurrentUser();
  // const { data } = UserLogin();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    console.log("logout done");
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userLoggedIn);
    refetch();
  }, [currentUser]);

  console.log(isLoggedIn);

  // const {} = useQuery({
  //   queryKey: "currentUser",
  //   queryFn: () => {
  //     const data = localStorage.getItem("currentUser");
  //     setUser(JSON.parse(data));
  //   },
  // });

  // const {} = useQuery({
  //   queryKey: "isLoggedIn",
  //   queryFn: () => {
  //     const loggedUser = localStorage.getItem("isLoggedIn");
  //     setIsLoggedIn(loggedUser);
  //     refetch();
  //   },
  // });

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center gap-3">
          <Image src={logo} alt="logo" width={48}></Image>
          <div>
            <Link
              href="/"
              className="text-white font-bold text-3xl hover:text-gray-300 uppercase"
            >
              Replica
            </Link>
          </div>
        </div>

        {/* Middle - Categories */}
        <div className="hidden md:flex space-x-4">
          {/* Add your categories links here */}
          <Link
            href="/category1"
            className="text-white text-sm hover:text-gray-300"
          >
            Category 1
          </Link>
          <Link
            href="/category2"
            className="text-white text-sm hover:text-gray-300"
          >
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
                    src={currentUser && currentUser.image}
                    alt="User's Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {/* Dropdown menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 bg-white border rounded shadow-lg">
                    {/* Add dropdown menu items here */}
                    <Link href="/profile">
                      <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm">
                        Profile
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm"
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
              <span className="text-white cursor-pointer hidden md:block text-sm hover:text-gray-300">
                Login
              </span>
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
            className={`w-6 h-6 fill-current ${
              isMenuOpen ? "hidden" : "block"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M4 8h16v2H4zm0 5h16v2H4z" />
          </svg>
          <svg
            className={`w-6 h-6 fill-current ${
              isMenuOpen ? "block" : "hidden"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M6.83 4L12 9.17L17.17 4L19 5.83L13.83 11L19 16.17L17.17 18L12 12.83L6.83 18L5 16.17L10.17 11L5 5.83L6.83 4Z" />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="mt-2">
            {/* Add your responsive menu items here */}
            <Link href="/category1">
              <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                Category 1
              </span>
            </Link>
            <Link href="/category2">
              <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                Category 2
              </span>
            </Link>
            {/* Add the login button to the responsive menu */}
            {!isLoggedIn && (
              <Link href="/login">
                <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                  Login
                </span>
              </Link>
            )}
            {/* Add other responsive menu items */}
            {isLoggedIn && (
              <>
                <Link href="/profile">
                  <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                    Profile
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm"
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
