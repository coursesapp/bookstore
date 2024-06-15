import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMinus,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FaSignInAlt } from "react-icons/fa";
import logo from "../Assets/Images/Mkanak-Logo.png";
import { Link } from "react-router-dom";
import Navbar from './Details/Navbar';
import SearchInput from './Details/SearchInput';

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "Book name",
      price: 14.99,
      quantity: 2,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Book name",
      price: 14.99,
      quantity: 2,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      name: "Book name",
      price: 14.99,
      quantity: 2,
    },
  ];

  const orderTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = 9;
  const deliveryCharge = 10;
  const total = orderTotal + tax + deliveryCharge;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
        <div className="flex items-center">
          <button className="text-xl mr-4">
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
          <Link to="/login" className="text-xl mr-4 text-gray-500">
            <FaSignInAlt />
          </Link>
        </div>
      </div>
      <SearchInput />

      {/* Cart Items */}
      <div className="flex justify-center ">
        {/* <div className="grid grid-cols-1 gap-4 w-full max-w-md  lg:max-w-lg border border-red-500 "> */}
        <div className="grid grid-cols-1 gap-4 w-full ">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 bg-white rounded-lg shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg"
              />
              <div className="flex-1 mr-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price}$</p>
                <button className="mt-2 p-2 text-gray-700">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className="flex flex-col items-center">
                <button className="p-2 text-yellow-500">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button className="p-2 text-yellow-500">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      {/* <div className="mt-8 p-4 bg-white rounded-lg shadow max-w-md mx-auto lg:max-w-lg"> */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow mb-[50px]">

        <div className="flex justify-between mb-2">
          <span>Order</span>
          <span>{orderTotal.toFixed(2)}$</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>{tax}$</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery charge</span>
          <span>{deliveryCharge}$</span>
        </div>
        <div className="flex justify-between mb-4 font-bold">
          <span>Total</span>
          <span>{total.toFixed(2)}$</span>
        </div>
        <button className="w-full py-2 px-4 border border-transparent rounded shadow-sm  mb-1 font-medium text-white bg-[#e8b914] hover:bg-yellow-500 active:outline-none active:ring-2 active:ring-offset-2 active:ring-[#e8b914]">

          Buy now
        </button>
      </div>
      {/* Bottom Navigation */}
      <Navbar selectLink="5" />
    </div>
  );
};

export default Cart;
