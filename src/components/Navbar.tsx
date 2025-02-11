import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      // Error is handled by signOut
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold">
                <span className="text-[#2DD4BF]">appi</span>
                <span className="text-black">Sp</span>
                <span className="text-[#2DD4BF]">ot</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/explore"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/explore') ? 'text-[#2DD4BF]' : 'text-gray-700 hover:text-[#2DD4BF]'
              }`}
            >
              Explore Spots
            </Link>

            <Link
              to="/list-spot"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/list-spot') ? 'text-[#2DD4BF]' : 'text-gray-700 hover:text-[#2DD4BF]'
              }`}
            >
              List Your Spot
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/about') ? 'text-[#2DD4BF]' : 'text-gray-700 hover:text-[#2DD4BF]'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/contact') ? 'text-[#2DD4BF]' : 'text-gray-700 hover:text-[#2DD4BF]'
              }`}
            >
              Contact
            </Link>

            {user ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                  {profile?.role === 'host' && (
                    <Link
                      to="/dashboard"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/dashboard') ? 'text-[#2DD4BF]' : 'text-gray-700 hover:text-[#2DD4BF]'
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#2DD4BF]"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-[#2DD4BF] hover:text-[#2DD4BF]/80"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#2DD4BF] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/explore"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/explore') ? 'text-[#2DD4BF] bg-gray-50' : 'text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Spots
            </Link>

            <Link
              to="/list-spot"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/list-spot') ? 'text-[#2DD4BF] bg-gray-50' : 'text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              List Your Spot
            </Link>

            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') ? 'text-[#2DD4BF] bg-gray-50' : 'text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/contact') ? 'text-[#2DD4BF] bg-gray-50' : 'text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {user ? (
              <>
                {profile?.role === 'host' && (
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/dashboard') ? 'text-[#2DD4BF] bg-gray-50' : 'text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#2DD4BF] hover:bg-[#2DD4BF]/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;