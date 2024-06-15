import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../Assets/Images/Mkanak-Logo.png";
import Navbar from './Details/Navbar';
import NavbarWeb from './Details/NavbarWeb';
import SearchInput from './Details/SearchInput';


const Home = ({ trendyBooks, setCurrentBook, recentBooks }) => {

  const handleSelectBook = (book) => {
    setCurrentBook(book);
  }



  return (

    <>
      <NavbarWeb />

      <div className="bg-white min-h-screen p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <img src={logo} alt="Logo" className="w-32 h-auto" />

          <div className="flex items-center">
            <Link to="/cart" className=" text-xl mr-4 text-gray-700">
              <FontAwesomeIcon icon={faCartPlus} />
            </Link>
            <Link to="/login" className="text-xl mr-4 text-gray-500">
              <FaSignInAlt />
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className="mb-8">
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="Search here"
              className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-full"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
            />
          </div>
        </div> */}
        <SearchInput />

        {/* Filter Buttons */}
        <div className="flex mb-8 overflow-x-auto scrollbar-hide">
          <button className="px-6 py-2 bg-gray-200 rounded-full whitespace-nowrap mr-4">
            رائج
          </button>
          <button className="px-6 py-2 bg-gray-200 rounded-full whitespace-nowrap mr-4 ">
            اخر نزول
          </button>
          <button className="px-6 py-2 bg-gray-200 rounded-full whitespace-nowrap mr-4">
            كتب ثانوية
          </button>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold"> رائج </h2>
          <div className="flex overflow-x-auto pb-4 scrollbar-hide">

            {
              trendyBooks ? trendyBooks.map((book) => (
                <div className="mr-4" onClick={() => { handleSelectBook(book) }}>
                  <Card imageUrl={`${book.image}`} title={`${book.title}`} />
                </div>
              )) : (
                Array.from({ length: 6 }).map((_, index) => <GrayCard key={index} />)
              )
            }
          </div>
        </div>

        {/* Another Horizontal Scrollable Cards */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold"> اخر نزولا  </h2>
          <div className="flex overflow-x-auto pb-4 scrollbar-hide">

            {
              recentBooks ? recentBooks.map((book) => (
                <div className="mr-4" onClick={() => { handleSelectBook(book) }}>
                  <Card imageUrl={`${book.image}`} title={`${book.title}`} />
                </div>
              )) : (
                Array.from({ length: 6 }).map((_, index) => <GrayCard key={index} />)
              )
            }
          </div>
        </div>

        {/* <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">كتب ثانوية</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          <Card imageUrl="https://via.placeholder.com/150" title="IKIGAI" />
          <Card imageUrl="https://via.placeholder.com/150" title="101 Essays" />
          <Card imageUrl="https://via.placeholder.com/150" title="The Subtle Art" />
          <Card imageUrl="https://via.placeholder.com/150" title="IKIGAI" />
          <Card imageUrl="https://via.placeholder.com/150" title="101 Essays" />
          <Card imageUrl="https://via.placeholder.com/150" title="The Subtle Art" />
        </div>
      </div> */}

        {/* Bottom Navigation */}
        <Navbar selectLink="1" />

      </div>
    </>
  );
};

const Card = ({ imageUrl, title }) => {
  return (
    <Link to="/bookdetails">
      <div className="min-w-[150px] max-w-[150px]">
        <img src={`data:image/png;base64,${imageUrl}`} alt={title} className="w-full h-32 rounded-lg mb-2" />
        <h3 className="text-center">{title}</h3>
      </div>
    </Link>
  );
};

const GrayCard = () => {
  return (
    <div className="min-w-[150px] max-w-[150px] mr-4">
      <div className="w-full h-32 bg-gray-300 rounded-lg mb-2"></div>
      <h3 className="text-center text-gray-400">Loading...</h3>
    </div>
  );
};

export default Home;
