'use client';  // Add this to ensure it's a Client Component

import { useState } from 'react';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/solid';  // Import Heroicons for User Profile

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link href="/" className="text-white font-bold text-xl">
          Noblie AI
        </Link>

        {/* User Profile Icon with Dropdown */}
        <div className="relative">
          <button
            className="text-white focus:outline-none"
            onClick={toggleDropdown}
          >
            <UserCircleIcon className="h-8 w-8" />  {/* User Profile Icon */}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Settings
              </Link>
              <Link href="/upgrade" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Upgrade Plan
              </Link>
              <Link href="/download" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Download App
              </Link>
              <Link href="/help" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Help & Support
              </Link>
              <Link href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
