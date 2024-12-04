'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UserCircleIcon, 
  Bars3Icon, 
  XMarkIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon,
  CloudArrowDownIcon,
  CreditCardIcon
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

// Navigation menu items
const NAV_MENU_ITEMS = [
  { href: '/settings', label: 'Settings', icon: Cog6ToothIcon },
  { href: '/upgrade', label: 'Upgrade Plan', icon: CreditCardIcon },
  { href: '/download', label: 'Download App', icon: CloudArrowDownIcon },
  { href: '/help', label: 'Help & Support', icon: QuestionMarkCircleIcon },
];

const Navbar: React.FC = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout(); // Use centralized logout from auth system
    router.push('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderDropdownMenu = () => (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
      {NAV_MENU_ITEMS.map((item) => (
        <Link 
          key={item.href}
          href={item.href} 
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          <item.icon className="h-5 w-5 mr-2 text-gray-600" />
          {item.label}
        </Link>
      ))}
      <button
        className="flex items-center w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
        onClick={handleLogout}
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-600" />
        Logout
      </button>
    </div>
  );

  const renderMobileMenu = () => (
    <div className="fixed inset-0 bg-gray-900 z-50 lg:hidden">
      <div className="flex justify-between p-4">
        <Link href="/home-dashboard" className="text-white font-bold text-xl">
          Noblie AI
        </Link>
        <button 
          onClick={toggleMobileMenu} 
          className="text-white focus:outline-none"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
      <div className="flex flex-col p-4">
        {NAV_MENU_ITEMS.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className="flex items-center py-3 text-white hover:bg-gray-800 rounded"
            onClick={toggleMobileMenu}
          >
            <item.icon className="h-6 w-6 mr-3 text-gray-300" />
            {item.label}
          </Link>
        ))}
        <button
          className="flex items-center py-3 text-white hover:bg-gray-800 rounded text-left"
          onClick={handleLogout}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3 text-gray-300" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link href="/home-dashboard" className="text-white font-bold text-xl">
          Noblie AI
        </Link>

        {/* Mobile Menu Toggle for Small Screens */}
        {isMobile ? (
          <button 
            onClick={toggleMobileMenu} 
            className="text-white focus:outline-none"
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
        ) : (
          // User Profile Icon with Dropdown for Desktop
          <div className="relative">
            <button
              className="text-white focus:outline-none"
              onClick={toggleDropdown}
            >
              <UserCircleIcon className="h-8 w-8" />
            </button>

            {dropdownOpen && renderDropdownMenu()}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && renderMobileMenu()}
    </nav>
  );
};

export default Navbar;