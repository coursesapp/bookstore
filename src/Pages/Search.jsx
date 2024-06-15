import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSearch, faHeart, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../Assets/Images/Mkanak-Logo.png";
import { FaSignInAlt } from "react-icons/fa";
import Fuse from 'fuse.js';
import Navbar from './Details/Navbar';
import CustomSelect from "../components/CustomSelect";


const Search = ({ setCurrentBook, educationStage, level, subject, category, author, allBooks }) => {

  // states 
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [filteredBooks, setFilteredBooks] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  console.log("here",allBooks);
  // useEffect 
  useEffect(() => {
    filterBooks();
  }, [selectedStage, selectedLevel, selectedAuthor, selectedSubject, selectedCategory]);

  //const 
  const fuse = new Fuse(allBooks, {
    includeScore: true,
    threshold: 0.3,
    keys: [
      { name: 'title', weight: 0.3 },
      { name: 'bookDescription', weight: 0.2 },
      { name: 'categoryName', weight: 0.1 },
      { name: 'subjectName', weight: 0.1 },
      { name: 'levelName', weight: 0.1 },
      { name: 'educationStageName', weight: 0.1 },
      { name: 'authorName', weight: 0.1 }
    ]
  });

  const handleSelectStage = (option) => {
    setSelectedStage(option?.value);
  };

  const handleSelectLevel = (option) => {
    setSelectedLevel(option?.value);
  };

  const handleSelectAuthor = (option) => {
    setSelectedAuthor(option?.value);
  };

  const handleSelectSubject = (option) => {
    setSelectedSubject(option?.value);
  };

  const handleSelectCategory = (option) => {
    setSelectedCategory(option?.value);
  };

  const handleSelectBook = (book) => {
    setCurrentBook(book);
  }

  const filterBooks = () => {
    // console.log(allBooks);
    if (allBooks) {
      const newBooks = allBooks?.filter(book =>
        (selectedCategory === "" || book.categoryId === selectedCategory) &&
        (selectedLevel === "" || book.levelId === selectedLevel) &&
        (selectedAuthor === "" || book.authorId === selectedAuthor) &&
        (selectedSubject === "" || book.subjectId === selectedSubject) &&
        (selectedStage === "" || book.educationStageId === selectedStage)
      );
      setFilteredBooks(newBooks);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const terms = term.split(' ').filter(t => t);
      const results = allBooks.filter(book =>
        terms.every(t =>
          fuse.search(t).map(result => result.item).includes(book)
        )
      );
      console.log(results);
      setFilteredBooks(results);
    } else {
      setFilteredBooks(allBooks);
    }
  };

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

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-lg mx-auto">
          <input
            value={searchTerm}
            onChange={handleSearch}
            type="text"
            placeholder="Search here"
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* filter section */}
        <div className="flex w-full flex-wrap mb-2 text-md scrollbar-hide custom-scroll ">
          <div className="mr-4 mb-2 ">
            <CustomSelect data={category} setoption={setSelectedCategory} />
          </div>
          <div className="mr-4 mb-2">
            <CustomSelect data={educationStage} setoption={setSelectedStage} />
          </div>
          <div className="mr-4 mb-2">
          <CustomSelect data={level} setoption={setSelectedLevel} />
          </div>
          <div className="mr-4 mb-2">
            <CustomSelect data={author} setoption={setSelectedAuthor} />
          </div>
          <div className="mr-4 mb-2">
            <CustomSelect data={subject} setoption={setSelectedSubject} />
          </div>
        </div>

        {/* select educationStage */}
        {/* <div className="flex mb-2 text-sm overflow-x-auto scrollbar-hide ">
          {educationStage?.map((option) => (
            <button
              key={option?.value}
              className={`px-4 py-[2px] bg-gray-200 rounded-full whitespace-nowrap mr-4 ${selectedStage == (option?.value) ? "bg-yellow-400" : "bg-gray-200"}`}
              onClick={() => handleSelectStage(option)}
            >
              {option?.label}
            </button>
          ))}
        </div> */}

        {/* select level */}
        {/* <div className="flex mb-2 text-sm overflow-x-auto scrollbar-hide">
          {level?.map((option) => (
            <button
              key={option?.value}
              className={`px-4 py-[2px] bg-gray-200 rounded-full whitespace-nowrap mr-4 ${selectedLevel == (option?.value) ? "bg-yellow-400 text-gray-100 " : "bg-gray-200"}`}
              onClick={() => handleSelectLevel(option)}
            >
              {option?.label}
            </button>
          ))}
        </div> */}

        {/* select category */}
        {/* <div className="flex mb-2 text-sm overflow-x-auto scrollbar-hide">
          {category?.map((option) => (
            <button
              key={option?.value}
              className={`px-4 py-[2px] bg-gray-200 rounded-full whitespace-nowrap mr-4 ${selectedCategory == (option?.value) ? "bg-yellow-400" : "bg-gray-200"}`}
              onClick={() => handleSelectCategory(option)}
            >
              {option?.label}
            </button>
          ))}
        </div> */}

        {/* select author */}
        {/* <div className="flex mb-2 text-sm overflow-x-auto scrollbar-hide">
          {author?.map((option) => (
            <button
              key={option?.value}
              className={`px-4 py-[2px] bg-gray-200 rounded-full whitespace-nowrap mr-4 ${selectedAuthor == (option?.value) ? "bg-yellow-400" : "bg-gray-200"}`}
              onClick={() => handleSelectAuthor(option)}
            >
              {option?.label}
            </button>
          ))}
        </div> */}

        {/* select subject */}
        {/* <div className="flex mb-2 text-sm overflow-x-auto scrollbar-hide">
          {subject?.map((option) => (
            <button
              key={option?.value}
              className={`px-4 py-[2px] bg-gray-200 rounded-full whitespace-nowrap mr-4 ${selectedSubject == (option?.value) ? "bg-yellow-400" : "bg-gray-200"}`}
              onClick={() => handleSelectSubject(option)}
            >
              {option?.label}
            </button>
          ))}
        </div> */}

      {/* cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {
        filteredBooks == [] ? <div className="text-center absolute top-[40%] left-[30%]"> <p className="text-2xl text-gray-500 font-extrabold ">There is no books</p> </div>
          : filteredBooks && filteredBooks?.map((book) => (
            <div onClick={() => { handleSelectBook(book) }}>
              <BookCard imageUrl={book.image} title={book.title} price={`${book.price} جنيه`} />
            </div> 
          ))
        }
      </div>

      {/* Bottom Navigation */}
      <Navbar selectLink="3"/>
    </div>
  );
};



const BookCard = ({ imageUrl, title, price }) => {
  return (
    <Link to="/bookdetails">
      <div className="flex flex-col items-center p-2 border rounded-lg shadow-sm cursor-auto">
        <img src={`data:image/png;base64,${imageUrl}`} alt={title} className="w-full h-40 object-cover rounded-md mb-2" />
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">{price}</p>
        <div className="flex justify-between w-full">
          <FontAwesomeIcon icon={faHeart} className="text-gray-400" />
          <FontAwesomeIcon icon={faCartPlus} className="text-yellow-500" />
        </div>
      </div>
    </Link>
  );
};


export default Search;
