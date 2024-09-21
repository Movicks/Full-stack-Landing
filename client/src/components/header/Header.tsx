// Header.tsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaPhone,
  FaServicestack,
  FaUserAlt,
} from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { logout } from "../../features/auth/authSlice";

const linkClasses = "flex items-center hover:text-gray-400 space-x-2";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="bg-red-500 text-white shadow-custom sticky top-0 left-0">
      <div className="container h-[3.5rem] md:h-[4.5rem] mx-auto px-4 lg:px-9 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">WHTA</div>

        {/* Navigation links for larger screens */}
        <nav className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${linkClasses} text-white` : linkClasses
            }
          >
            <span className="text-lg">Home</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${linkClasses} text-white` : linkClasses
            }
          >
            <span className="text-lg">About</span>
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? `${linkClasses} text-white` : linkClasses
            }
          >
            <span className="text-lg">Services</span>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${linkClasses} text-white` : linkClasses
            }
          >
            <span className="text-lg">Contact</span>
          </NavLink>
          <NavLink
            to="/profile"
            className="W-[4rem] h-[4rem] flex items-center justify-center"
          >
            <span className="text-lg ">Profile</span>
          </NavLink>
          <div className="flex items-center space-x-2 ">
            {!isAuthenticated ? (
              <button
                onClick={handleLoginClick}
                className="bg-white text-red-500 px-4 py-2 rounded"
                aria-label="Login"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-white text-red-500 px-4 py-2 rounded"
                aria-label="Profile"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Hamburger menu for smaller screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <AiOutlineClose className="w-6 h-6" />
            ) : (
              <AiOutlineMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-90 bg-red-500 transform overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden w-3/4 max-w-sm`}
      >
        <nav className="px-4 py-9 flex flex-col justify-between h-full">
          <div className="flex flex-col items-start space-y-4 gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${linkClasses} text-red-500 bg-white w-full px-2 py-2 shadow-custom`
                  : linkClasses
              }
              onClick={() => setIsOpen(false)}
            >
              <TbLayoutDashboardFilled className="text-2xl" /> <span>Home</span>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${linkClasses} text-red-500 bg-white w-full px-2 py-2 rounded shadow-custom`
                  : linkClasses
              }
              onClick={() => setIsOpen(false)}
            >
              <FaUserAlt className="text-2xl" /> <span>Profile</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `${linkClasses} text-red-500 bg-white w-full px-2 py-2 rounded shadow-custom`
                  : linkClasses
              }
              onClick={() => setIsOpen(false)}
            >
              <FaInfoCircle className="text-2xl" /> <span>About Us</span>
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? `${linkClasses} text-red-500 bg-white w-full px-2 py-2 rounded shadow-custom`
                  : linkClasses
              }
              onClick={() => setIsOpen(false)}
            >
              <FaServicestack className="text-2xl" /> <span>Services</span>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? `${linkClasses} text-red-500 bg-white w-full px-2 py-2 rounded shadow-custom`
                  : linkClasses
              }
              onClick={() => setIsOpen(false)}
            >
              <FaPhone className="text-2xl" /> <span>Contact</span>
            </NavLink>
          </div>
          <div className="flex items-center space-x-2 w-full pb-9">
            {!isAuthenticated ? (
              <button
                onClick={handleLoginClick}
                className="text-red-500 bg-white px-4 py-2 rounded w-full max-w-[20rem] font-semibold"
                aria-label="Login"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="text-red-500 bg-white px-4 py-2 rounded w-full max-w-[20rem] font-semibold"
                aria-label="Logout"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
