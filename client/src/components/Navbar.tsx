import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  userId,
  handleLogout
}: {
  userId: string;
  handleLogout?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/" className="px-4 py-2 hover:bg-blue-600 rounded transition duration-200">Feed</Link>
          <Link to="/messages" className="px-4 py-2 hover:bg-blue-600 rounded transition duration-200">Messages</Link>
          <Link to="/search" className="px-4 py-2 hover:bg-blue-600 rounded transition duration-200">Search</Link>
          <Link to={`/profile/${userId}`} className="px-4 py-2 hover:bg-blue-600 rounded transition duration-200">Profile</Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 focus:outline-none"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 px-8 py-4 space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-blue-600 rounded transition duration-200">Feed</Link>
          <Link to="/messages" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-blue-600 rounded transition duration-200">Messages</Link>
          <Link to="/search" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-blue-600 rounded transition duration-200">Search</Link>
          <Link to={`/profile/${userId}`} onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-blue-600 rounded transition duration-200">Profile</Link>

          <button
            onClick={() => {
              handleLogout?.();
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
