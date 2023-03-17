'use client';

import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

import { motion } from 'framer-motion';

import styles from '@/styles';
import { navVariants } from '@/utils/motion';
import { navLinks } from '@/constants';

const SearchBar = ({ value, handleSearchChange }) => {
  const [debouncedSearch, setDebouncedSearch] = useState(value);

  useEffect(() => {
    setDebouncedSearch(value);
  }, [value]);

  const debouncedHandleChange = debounce(() => {
    handleSearchChange(debouncedSearch);
  }, 500); // Set a debounce delay of 500ms

  const handleChange = (e) => {
    const changeValue = e.target.value;
    setDebouncedSearch(changeValue);
    debouncedHandleChange();
  };

  return (
    <input
      type="text"
      placeholder="Explore the World"
      onChange={handleChange}
      value={debouncedSearch}
      className="px-4 py-2 rounded-[32px] border-2 border-[#6A6A6A] focus:outline-none focus:border-gray-300 text-white md:flex hidden searchbar-gradient"
    />
  );
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />

      <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
        <div className="z-10 flex justify-start">
          <SearchBar 
            value={searchInput} 
            handleSearchChange={handleChange} 
          />
          <div className="flex flex-row group md:border-2 md:rounded-[32px] justify-center items-center w-[60px] cursor-pointer">
            <img
              src="/search.svg"
              alt="search"
              className="w-[24px] h-[24px] object-contain group-hover:"
            />
          </div>
        </div>
        <div className="">
          <h2 className="font-extrabold text-[24px] left-96 leading-[30px] text-white">METAVERSUS</h2>
        </div>
        <img 
          src={toggle ? "close.svg" : "/menu.svg"}
          alt="menu"
          onClick={() => setToggle((prev) => !prev)}
          className="w-[24px] h-[24px] object-contain"
        />
        <div className={`${toggle ? 'flex' : 'hidden' } min-w-[150px] p-6 absolute flex-col sm:right-40 right-10 top-20 bg-[#121315] rounded-[24px] z-[100]`}>
          <ul className="flex flex-1 flex-col justify-start mx-4 text-white font">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-normal font-poppins cursor-pointer text-[14px] leading-[17px] py-1/2 ${index === navLinks.length - 1 ? 'mb-0' : 'mb-5'}`}
              >
                <a href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;