import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function NavBar({eventName}) {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* Navbar */}
      <header className="relative py-6 px-6 lg:px-20 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-yellow-500">
            {eventName}
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-yellow-500">
            Home
          </Link>
          <Link to="./programs" className="hover:text-yellow-500">
            Programs
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="absolute top-16 left-0 w-full bg-[#431D1D] shadow-lg text-center py-4 z-50">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block text-lg hover:text-yellow-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="./programs"
                  className="block text-lg hover:text-yellow-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Programs
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

export default NavBar;
