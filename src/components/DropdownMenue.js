// src/components/DropdownMenu.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCaretDown } from "react-icons/fa";

const DropdownMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative">
      <div onClick={toggleMenu} className="flex items-center cursor-pointer">
        <FaUser className="w-6 h-6" />
        <FaCaretDown className="w-4 h-4 ml-1" />
      </div>
      {showMenu && (
        <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-2 right-0 z-50">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="/login">Login</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="/logout">Logout</Link> {/* Add your logout logic here */}
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
