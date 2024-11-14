import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi"
import string from '../../String';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-green-200 shadow-md py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center flex-shrink-0">
          <h1 className="text-green-800 text-3xl font-bold">Expense Tracker</h1>
        </div>

        {/* Center Section */}
        {currentUser ? (<>
        <div className="hidden md:flex space-x-4">
          <Link to='/dashboard' className="hover:text-green-500 text-green-800 text-xl font-medium">Dashboard</Link>
          <Link to='/transaction' className="hover:text-green-500 text-green-800 text-xl font-medium">Transactions</Link>
        </div></>) : null}

        {/* Right Section */}
        <div className="relative flex items-center">
          {currentUser ? (
            <>
              <button onClick={toggleDropdown} className="flex items-center relative">
                <span className="text-green-800 text-xl mx-2 font-medium hidden sm:block">
                  {currentUser.user.username}
                </span>
                <img
                  className="rounded-full h-7 w-7 object-cover sm:h-10 sm:w-10"
                  src={`${string}${currentUser.user.avatar}`}
                  alt="profile"
                />
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-40 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                  role="menu"
                >
                  <div className="py-1" role="none">
                    <Link
                      to="/profile"
                      className="flex rounded-lg px-4 py-2 text-md font-medium text-green-800 hover:bg-green-100 hover:text-gray-700"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <CgProfile className="text-2xl flex-grow" />
                      <span className="mx-auto flex-none w-3/4">Profile</span>
                    </Link>
                    <Link
                      to="/category"
                      className="flex rounded-lg px-4 py-2 text-md font-medium text-green-800 hover:bg-green-100 hover:text-gray-700"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <BiSolidCategory className="text-2xl flex-grow" />
                      <span className="mx-auto flex-none w-3/4">Categories</span>
                    </Link>
                    <Link
                      to="/signout"
                      className="flex rounded-lg px-4 py-2 text-md font-medium text-green-800 hover:bg-green-100 hover:text-gray-700"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <TbLogout className="text-2xl flex-grow" />
                      <span className="mx-auto flex-none w-3/4">Sign Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/signup">
                <div className="bg-green-800 px-5 py-3 rounded-3xl text-white mx-2 hover:bg-green-700">
                  <button className="text-lg">Sign Up</button>
                </div>
              </Link>
              <Link to="/signin">
                <div className="bg-green-800 px-5 py-3 rounded-3xl text-white mx-2 hover:bg-green-700">
                  <button className="text-lg">Sign In</button>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
