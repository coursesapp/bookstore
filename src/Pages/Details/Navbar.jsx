import React from 'react'
import { HiOutlineHome } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar({ selectLink }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white py-4 flex justify-around items-center border-t border-gray-300 md:max-w-lg mx-auto navbar " >
            <Link to="/" className={`text-gray-500 ${selectLink==="1"?"text-yellow-500":"text-gray-500"}`}>
                <HiOutlineHome className="text-2xl" />
            </Link>
            {/* <Link to="/Profile" className="text-gray-500">
                <GoPerson className="text-2xl" />
            </Link> */}
            <Link to="/categotyBooks" className={`text-gray-500 ${selectLink==="2"?"text-yellow-500":"text-gray-500"}`}>
                <BiCategoryAlt className="text-2xl" />
            </Link>
            <Link to="/search" className={`text-gray-500 ${selectLink==="3"?"text-yellow-500":"text-gray-500"}`}>
                <FiSearch className="text-2xl" />
            </Link>
            <Link to="/favourite" className={`text-gray-500 ${selectLink==="4"?"text-yellow-500":"text-gray-500"}`}>
                <FaRegHeart className="text-2xl" />
            </Link>
            <Link to="/cart" className={`text-gray-500 ${selectLink==="5"?"text-yellow-500":"text-gray-500"}`}>
                <MdOutlineShoppingCart className="text-2xl" />
            </Link>

        </div>
    )
}
