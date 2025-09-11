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
      <nav className="flex items-center justify-between p-5 sticky top-0 bg-white z-50 shadow-md w-full">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center text-2xl font-bold"
          onClick={() => setToggle(false)}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
            TL
          </div>
          <span className="ml-2">
            <span className="text-black">Travel</span>
            <span className="text-blue-600">Lite</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setToggle(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          {toggle ? (
            <AiOutlineClose
              size={28}
              onClick={() => setToggle(false)}
              className="cursor-pointer text-gray-700"
            />
          ) : (
            <HiMenuAlt1
              size={28}
              onClick={() => setToggle(true)}
              className="cursor-pointer text-gray-700"
            />
          )}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {toggle && (
        <div className="lg:hidden bg-white border-t shadow-lg absolute w-full z-40">
          <div className="px-6 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setToggle(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg mb-1 cursor-pointer transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
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