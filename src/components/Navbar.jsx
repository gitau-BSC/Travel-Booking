import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between py-4 sticky top-0 bg-white z-50 shadow-md w-full px-0 mx-0 max-w-none">
        {/* Logo */}
        <div className="flex justify-start ml-0 pl-0">
          <NavLink
            to="/"
            className="flex items-center text-2xl font-bold group ml-4"
            onClick={() => setToggle(false)}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-105 transition-transform duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="ml-3">
              <span className="text-gray-900">Travel</span>
              <span className="text-blue-600">Lite</span>
            </span>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-1 mr-0 pr-0">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setToggle(false)}
              className={({ isActive }) =>
                `px-6 py-3 rounded-full transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden mr-0 pr-0">
          {toggle ? (
            <AiOutlineClose
              size={28}
              onClick={() => setToggle(false)}
              className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors mr-4"
            />
          ) : (
            <HiMenuAlt1
              size={28}
              onClick={() => setToggle(true)}
              className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors mr-4"
            />
          )}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {toggle && (
        <div className="lg:hidden bg-white border-t shadow-lg absolute w-full z-40 px-0 mx-0">
          <div className="py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setToggle(false)}
                className={({ isActive }) =>
                  `block py-4 px-8 transition-all duration-200 font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;