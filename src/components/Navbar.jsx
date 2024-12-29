import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";

import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Orders", href: "/orders" },
  { name: "Cart", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

const adminNavigation = [{ name: "Dashboard", href: "/dashboard" }];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    setIsDropdownOpen(false); // Close the dropdown after logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const isAdmin = currentUser?.role === "admin";

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <FaBars className="size-6" />
          </Link>
          {/* Search Input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <FaSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>
        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div className="">
            {currentUser ? (
              <>
                <button onClick={toggleDropdown}>
                  <img
                    src={avatar}
                    alt="avatar"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-40">
                    <ul className="py-2">
                      {(isAdmin ? adminNavigation : navigation).map(
                        (item, index) => (
                          <li
                            key={index}
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <Link
                              to={item.href}
                              className="block py-2 px-4 item-sm hover:bg-gray-100 rounded-md"
                            >
                              {item.name}
                            </Link>
                          </li>
                        )
                      )}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left py-2 px-4 item-sm hover:bg-gray-100 rounded-md"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <FaUser className="size-6" />
              </Link>
            )}
          </div>
          <button className="hidden sm:block">
            <CiHeart className="size-8" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center gap-2 rounded-md"
          >
            <FaCartShopping className="size-6" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
