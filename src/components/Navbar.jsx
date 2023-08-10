"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import GetCurrentUser from "@/utils/getCurrentUser";
import { toast } from "react-hot-toast";
import NavItem from "./NavItem";
import NavLink from "./NavLink";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
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
    router.push("/login");
    toast.success("Logout successful");
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("currentUser");
    refetch();
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userLoggedIn);
  }, [currentUser]);

  const navItems = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: `/profile/${currentUser?.email}`,
      name: "Profile",
    },
    {
      href: "/postAJob",
      name: "Post A Job",
    },
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-gray-800 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center gap-3">
            <Image src={logo} alt="logo" width={48} height={"auto"}></Image>
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
              {/*categories links*/}
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  exact={item.href === "/"}
                  activeClassName="border-b-4 border-[#8c52ff]"
                  href={item.href}
                  className="text-white text-sm hover:text-[#8c52ff]"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Check if user is logged in */}
            {isLoggedIn && currentUser ? (
              <>
                {/* User's photo */}
                <div className="hidden md:block md:relative">
                  <button
                    className="flex text-white items-center focus:outline-none"
                    onClick={toggleProfile}
                  >
                    <img
                      src={currentUser && currentUser.image}
                      alt="User's Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </button>

                  {/* Dropdown menu */}
                  {isProfileOpen && (
                    <div
                      className={`absolute right-0 mt-2 py-2 bg-white border rounded shadow-lg z-50`}
                    >
                      {/* Add dropdown menu items here */}
                      <Link href={`/profile/${currentUser?.email}`}>
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
        <div className="md:hidden mt-4 relative">
          <button
            onClick={toggleMenu}
            className="text-white font-bold text-xl focus:outline-none absolute -top-12 right-0 z-[100]"
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
                  <Link href={`/profile/${currentUser?.email}`}>
                    <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                      Profile
                    </span>
                  </Link>
                  <Link href="/postAJob">
                    <span className="block py-2 px-4 text-white hover:bg-gray-700 cursor-pointer text-sm">
                      Post A Job
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
    </header>
  );
};

export default Navbar;
