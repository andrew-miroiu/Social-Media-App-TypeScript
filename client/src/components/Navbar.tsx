import React, { useState } from "react";

export default function Navbar({ onPageChange, userId , handleLogout}: { onPageChange: (page: string, userId?: string) => void; userId: string; handleLogout?: () => void}) {
  const [isOpen, setIsOpen] = useState(false);

  function changePage(page: string, userId?: string) {
    onPageChange(page, userId);
    setIsOpen(false); // Close menu after clicking
  }

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-3xl font-bold text-blue-400">OnlyFriends</h1>
        </div>

        {/* Desktop Navigation (hidden on mobile) */}
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={() => changePage("feed")}
            className="px-4 py-2 text-white hover:bg-blue-600 rounded transition duration-200"
          >
            Feed
          </button>
          <button
            onClick={() => changePage("messages")}
            className="px-4 py-2 text-white hover:bg-blue-600 rounded transition duration-200"
          >
            Messages
          </button>
          <button
            onClick={() => changePage("search")}
            className="px-4 py-2 text-white hover:bg-blue-600 rounded transition duration-200"
          >
            Search
          </button>
          <button
            onClick={() => changePage("profile", userId)}
            className="px-4 py-2 text-white hover:bg-blue-600 rounded transition duration-200"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Menu Button (mobile only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 focus:outline-none"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu (shown when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 px-8 py-4 space-y-2">
          <button
            onClick={() => changePage("feed")}
            className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600 rounded transition duration-200"
          >
            Feed
          </button>
          <button
            onClick={() => changePage("messages")}
            className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600 rounded transition duration-200"
          >
            Messages
          </button>
          <button
            onClick={() => changePage("search")}
            className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600 rounded transition duration-200"
          >
            Search
          </button>
          <button
            onClick={() => changePage("profile", userId)}
            className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600 rounded transition duration-200"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
