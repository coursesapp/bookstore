import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrashAlt, faHeart, faTh, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../Assets/Images/Mkanak-Logo.png";
import Navbar from './Details/Navbar';
import SearchInput from './Details/SearchInput';
import { FaSignInAlt } from "react-icons/fa";

const Favourite = () => {
  return (
    <div className="bg-white min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
        <div className="flex items-center">
          <Link to="/cart" className="text-xl mr-4 text-gray-700">
            <FontAwesomeIcon icon={faCartPlus} />
          </Link>
          <Link to="/login" className="text-xl mr-4 text-gray-500">
            <FaSignInAlt />
          </Link>
        </div>
      </div>
      <SearchInput />


      {/* Wishlist Items */}
      <div className="space-y-4">
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
      </div>

      {/* Bottom Navigation */}
      <Navbar selectLink="4" />
    </div>
  );
};

const WishlistItem = () => {
  return (
    <div className="flex items-center border p-4 rounded-lg w-full md:w-3/4 lg:w-1/2 ">
      <img
        src="https://via.placeholder.com/80"
        alt="Book"
        className="w-20 h-20 rounded-lg mr-4"
      />
      <div className="flex-1 mr-4">
        <h2 className="font-bold text-lg">Book name</h2>
        <p className="text-gray-500">Description for the book </p>
      </div>
      <button className="text-yellow-500 text-lg">
        <FontAwesomeIcon icon={faCartPlus} />
      </button>
      <button className="text-gray-500 text-lg mr-4">
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default Favourite;
