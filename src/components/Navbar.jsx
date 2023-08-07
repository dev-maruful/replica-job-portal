"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import GetCurrentUser from "@/utils/getCurrentUser";
import { toast } from "react-hot-toast";
import NavItem from "./NavItem";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: currentUser, refetch } = GetCurrentUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    toast.success("Logout successful");
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("currentUser");
    refetch();
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userLoggedIn);
  }, [currentUser]);

  const categoryItems = (
    <>
      <NavItem href="/frontendDev" name="Frontend Development"></NavItem>
      <NavItem href="/backendDev" name="Backend Development"></NavItem>
      <NavItem href="/fullStackDev" name="Full-stack Development"></NavItem>
      <NavItem href="/uiUxDesign" name="UI/UX Design"></NavItem>
      <NavItem href="/digitalMarketing" name="Digital Marketing"></NavItem>
      <NavItem href="/dataEntry" name="Data Entry"></NavItem>
    </>
  );

  return (
    <header>
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
          {currentUser && (
            <div className="hidden md:flex space-x-4">
              {/* Add your categories links here */}
              <Link href="/" className="text-white text-sm hover:text-gray-300">
                Home
              </Link>
              <Link
                href="/profile"
                className="text-white text-sm hover:text-gray-300"
              >
                Profile
              </Link>
              <Link
                href="/dashboard"
                className="text-white text-sm hover:text-gray-300"
              >
                Dashboard
              </Link>
              <Link
                href="/postAJob"
                className="text-white text-sm hover:text-gray-300"
              >
                Post a job
              </Link>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Check if user is logged in */}
            {isLoggedIn && currentUser ? (
              <>
                {/* User's photo */}
                <div className="relative">
                  <button
                    className="flex text-white items-center focus:outline-none"
                    onClick={toggleProfile}
                  >
                    {/* Replace 'userPhotoUrl' with the actual URL of the user's photo */}
                    <img
                      src={currentUser && currentUser.image}
                      alt="User's Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </button>

                  {/* Dropdown menu */}
                  {isProfileOpen && (
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
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <span className="text-white cursor-pointer hidden md:block text-sm border-2 border-white px-2 py-1 rounded-lg hover:border-[#8c52ff] hover:bg-[#8c52ff]">
                    Login
                  </span>
                </Link>
                <Link href="/register">
                  <span className="text-white cursor-pointer hidden md:block text-sm border-2 border-white px-2 py-1 rounded-lg hover:border-[#8c52ff] hover:bg-[#8c52ff]">
                    Register
                  </span>
                </Link>
              </div>
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
              <Link href="/">
                <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                  Home
                </span>
              </Link>
              <button
                onClick={toggleCategory}
                className="flex items-center gap-1 text-white py-2 px-4 hover:bg-gray-700 cursor-pointer text-sm w-full"
              >
                <span>Categories</span>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-4 h-4 ${isCategoryOpen ? "hidden" : "block"}`}
                >
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-4 h-4 ${isCategoryOpen ? "block" : "hidden"}`}
                >
                  <path d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              {isCategoryOpen && (
                <div className="ml-4">
                  <NavItem
                    href="/frontendDev"
                    name="Frontend Development"
                    classes="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm"
                  ></NavItem>
                  <NavItem
                    href="/backendDev"
                    name="Backend Development"
                    classes="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm"
                  ></NavItem>
                  <NavItem
                    href="/fullStackDev"
                    name="Full-stack Development"
                    classes="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm"
                  ></NavItem>
                  <NavItem
                    href="/uiUxDesign"
                    name="UI/UX Design"
                    classes="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm"
                  ></NavItem>
                  <NavItem
                    href="/digitalMarketing"
                    name="Digital Marketing"
                    classes="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm"
                  ></NavItem>
                  <NavItem
                    href="/dataEntry"
                    name="Data Entry"
                    classes="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm"
                  ></NavItem>
                </div>
              )}

              {/* Add the login button to the responsive menu */}
              {!currentUser && (
                <Link href="/login">
                  <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                    Login
                  </span>
                </Link>
              )}
              {/* Add other responsive menu items */}
              {currentUser && (
                <>
                  <Link href="/profile">
                    <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                      Profile
                    </span>
                  </Link>
                  <Link href="/profile">
                    <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                      Dashboard
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
      <nav>
        <div className="bg-[#8c52ff]">
          <div className="container mx-auto space-x-4 py-1 hidden md:flex items-center justify-center">
            {categoryItems}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
