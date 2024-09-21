import React, { useEffect, useState } from 'react';
import logo from '../../assets/Airbnb-Logo.png';
import { MdLanguage, MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import './Header.scss';

const Header = () => {
  const [searchInput,setSearchInput] = useState('');

  const placeholder = 'Start your search';
  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
         {/* left */}
         <div className="relative flex items-center h-10 cursor-pointer my-auto">
          <img
            src={logo}
            className='object-cover -my-2 w-40'
          />
        </div>

        {/* middle */}
        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-md">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 "
            type="text"
            placeholder={placeholder || "Start your search"}
          />
          <button className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2">
          <MdOutlineSearch  />
          </button>
        </div>

        {/* right */}
        <div className="flex space-x-4 items-center justify-end text-gray-500">
          <p className=" cursor-pointer hidden md:inline ">Become a host</p>
          <MdLanguage className="h-6 cursor-pointer" />

          <div className="flex items-center space-x-2 border rounded-full px-4 py-4 hover:shadow-md transition-all">
            <GiHamburgerMenu className="h-6" />
            <FaUserCircle className="h-6" />
          </div>
        </div>

    </header>
    // <div className={`fixed w-full top-0 ${isScrolled ? 'scrolled' : ''}`}>
    //   <div className="flex items-center justify-between p-4 header">
    //     <div className="h-20 hidden md:flex">
    //       <img src={logo} alt="" className="object-cover -my-2" />
    //     </div>
    //     <form className="flex items-center">
    //       <input
    //         type="text"
    //         placeholder="Where are you going?"
    //         required
    //       />
    //       <button type="submit">
    //         <MdOutlineSearch />
    //       </button>
    //     </form>
    //     <div className="hidden md:flex items-center space-x-4 cursor-pointer">
    //       <span>Đón tiếp khách</span>
    //       <MdLanguage />
    //       <div className="flex items-center space-x-4 border rounded-3xl px-4 py-4 hover:shadow-md transition-all">
    //         <GiHamburgerMenu />
    //         <FaUserCircle />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Header;
