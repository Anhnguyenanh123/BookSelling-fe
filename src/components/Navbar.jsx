import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import Swal from "sweetalert2";

import avatar from "../assets/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { getCartThunk } from "../redux/features/cart/catSlice";

const navigation = [
  { name: "Orders", href: "/orders" },
  { name: "Cart", href: "/cart" },
];

const adminNavigation = [{ name: "Dashboard", href: "/dashboard" }];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser, logoutUser } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getCartThunk({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        setIsDropdownOpen(false); // Close the dropdown after logout
        Swal.fire("Logged out!", "You have been logged out.", "success");
      }
    });
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
            <span className="text-sm font-semibold sm:ml-1">
              {totalCartItems > 0 ? totalCartItems : 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
