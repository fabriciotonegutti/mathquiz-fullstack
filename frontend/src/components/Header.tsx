"use client"; // Add use client directive as we will use useState

import React from 'react';
import Link from 'next/link';

// Example Icon (replace with actual icons if you have an icon library)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const UserCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-white text-gray-800 p-4 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Hamburger menu (for mobile) and Logo/Title */}
        <div className="flex items-center">
          <button className="md:hidden mr-3 text-gray-600 hover:text-gray-800">
            <MenuIcon />
          </button>
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600">MathQuiz</h1>
          </Link>
        </div>

        {/* Right side: Profile Icon */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800" aria-label="User profile">
            <UserCircleIcon />
          </button>
          {/* Add other icons or links here */}
        </div>
      </div>
    </header>
  );
};

export default Header; 