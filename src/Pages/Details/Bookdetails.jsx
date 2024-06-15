import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import bookCover from "../../Assets/Images/OIP.jpg";
import logo from "../../Assets/Images/Mkanak-Logo.png";
import { faCartPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const BookDetail = ({ currentBook }) => {
  return (
    <div className="bg-white min-h-screen p-4 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 w-full max-w-screen-lg">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
        <div className="flex items-center">
          <Link to="/cart" className="text-xl mr-8 text-gray-700">
            <FontAwesomeIcon icon={faCartPlus} />
          </Link>
          <Link to="/login" className="text-xl mr-4 text-gray-500">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-screen-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Book Details */}
        <div className="flex flex-col items-center lg:items-start mb-4">
          <img src={`data:image/png;base64,${currentBook.image}`} alt="The Conquest of Happiness" className="md:w-3/4 w-full h-auto mb-4 rounded-[12px]" />
          {/* <h2 className="text-2xl font-bold mb-1 text-center lg:text-right">{currentBook.title}</h2>
          <p className="text-lg text-gray-700 text-center lg:text-right"> {currentBook.bookDescription} </p> */}
        </div>

        <div className="flex flex-col justify-start">
          {/* Book Overview */}
          <div className="mb-6 px-4 md:px-0">
            <h3 className="text-2xl font-bold text-gray-700 mb-2"> تفاصيل الكتاب : </h3>
            <p className="text-lg text-gray-700  lg:text-right mt-4"><span className="font-semibold">الاسم</span> : {currentBook.title} </p>
            <p className="text-lg text-gray-700  lg:text-right mt-4"> <span className="font-semibold">تفاصيل</span> : {currentBook.bookDescription} </p>
            <p className="text-gray-700 lg:text-right mt-4">
              <span className="font-semibold">كتاب</span> : {currentBook?.authorName} {currentBook?.subjectName} {currentBook?.levelName}{" "}
              {currentBook?.educationStageName}{" "}
              {currentBook?.isForFirstTerm ? "الترم الأول" : " الترم الثاني"}
            </p>
            <p className="text-lg text-gray-700  lg:text-right mt-4"> <span className="font-semibold">السعر</span> :  {currentBook.price} جنيه</p>
          </div>

          {/* Buy Now Button */}
          <div className="flex justify-center lg:justify-start lg:mt-[40px]">
            <button className="w-full py-2 px-4 border border-transparent rounded shadow-sm  mb-1 font-medium text-white bg-[#e8b914] hover:bg-yellow-500 active:outline-none active:ring-2 active:ring-offset-2 active:ring-[#e8b914]">
              اطلب الأن
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
