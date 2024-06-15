import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarWeb = () => {
    const [isOpen, setIsOpen] = useState(false);
// border
    return (
        <nav className="bg-black text-white z-50 py-3 px-8 fixed w-full hidden lg:block">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link className="text-[#ffc812] font-extrabold text-2xl uppercase" to="/"><span className='text-white bg-[#ffc812]'>M</span>kanak</Link>
                <button
                    className="block lg:hidden text-gray-500 focus:outline-none"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-controls="navbarSupportedContent"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                <div className={`w-full  ml-auto lg:flex lg:items-center lg:w-auto mr-10 ${isOpen ? 'block' : 'hidden'}`} id="navbarSupportedContent">
                    <ul className="flex flex-col lg:flex-row lg:space-x-20 ">
                        <li className="nav-item  ml-20">
                            <Link className="block py-2 pr-4 pl-3 text-white lg:p-0 text-2xl" to="/link">الطلبات</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="block py-2 pr-4 pl-3 text-white lg:p-0 text-2xl" to="/link">الطلبات</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="block py-2 pr-4 pl-3 text-white lg:p-0 text-2xl" to="/link">الطلبات</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="block py-2 pr-4 pl-3 text-white lg:p-0 mr-5 text-2xl" aria-current="page" to="/">السلة</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="block py-2 pr-4 pl-3 text-white lg:p-0 text-2xl" to="/link">المفضلة</Link>
                        </li>
                        <li className="relative nav-item group">
                            <Link className="block py-2 pr-4 pl-3 text-white lg:p-0 text-2xl" to="#" role="button" aria-expanded="false">الاقسام</Link>
                            <ul className="absolute hidden pt-1 text-white bg-white rounded-lg shadow-lg group-hover:block">
                                <li><Link className="block px-4 py-2 hover:bg-gray-200" to="#">Action</Link></li>
                                <li><Link className="block px-4 py-2 hover:bg-gray-200" to="#">Another action</Link></li>
                                <li><hr className="border-t border-gray-300" /></li>
                                <li><Link className="block px-4 py-2 hover:bg-gray-200" to="#">Something else here</Link></li>
                            </ul>
                        </li>
                    </ul>

                </div>
                <form className="flex mt-4 lg:mt-0" role="search">
                    <button className="btn ml-2 bg-[#ffc812] text-black font-semibold px-3 py-1.5 rounded transition ease-in-out hover:bg-green-600 focus:outline-none" type="submit">تسجيل الدخول</button>
                </form>
            </div>
        </nav>
    );
}

export default NavbarWeb;
