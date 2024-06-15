import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from "../../Assets/Images/Mkanak-Logo.png";
import Navbar from '../Details/Navbar';
import SearchInput from './SearchInput';
import { FaSignInAlt } from "react-icons/fa";
import stage1 from "../../Assets/Images/stage1.png"
import stage2 from "../../Assets/Images/stage2.png"
import stage3 from "../../Assets/Images/stage3.png"

const CategotyBooks = () => {
  return (
    <div className="bg-white min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
        <div className="flex items-center">
          <Link to="/cart" className="text-xl mr-8 text-gray-700">
            <FontAwesomeIcon icon={faCartPlus} />
          </Link>
          <Link to="/login" className="text-xl mr-4 text-gray-500">
          <FaSignInAlt />
          </Link>
        </div>
      </div>

        <SearchInput />

      {/* Book Cards */}
      <p className="text-[30px] text-gray-700 text-right lg:mr-[120px] mb-7 font-bold">الاقسام </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className='flex flex-col items-center p-2'>
          <img src={stage1}/>
          <p className='font-bold text-2xl'>
          المرحلة الابتدائية 
          </p>
        </div>
        <div className='flex flex-col items-center p-2'>
          <img src={stage2}/>
          <p className='font-bold text-2xl'>
          المرحلة الاعدادية 
          </p>
        </div>
        <div className='flex flex-col items-center p-2'> 
          <img src={stage3}/>
          <p className='font-bold text-2xl'>
          المرحلة الثانوية 
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navbar selectLink="2" />
    </div>
  );
};

export default CategotyBooks;
