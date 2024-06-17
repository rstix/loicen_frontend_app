'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import userIcon from '../../public/user.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setLoggedIn(true);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    setLoggedIn(true);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setLoggedIn(false);
    setIsOpen(false);
  };

  return (
    <div className="flex relative justify-end w-full pt-2 pb-1 px-4">
      <Image
        onClick={toggleDropdown}
        className="cursor-pointer"
        src={userIcon}
        width={35}
        alt="user icon"
      />
      {isOpen && (
        <div className="origin-top-right absolute right-2 top-[100%] mt-1 w-56 rounded-md bg-gray-dark border shadow-lg focus:outline-none flex flex-col p-4">
          {!loggedIn ? (
            <form onSubmit={handleLogin}>
              <input
                placeholder="username"
                className="py-1 px-[10px] box-content bg-gray rounded w-[calc(100%-20px)]"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                className="py-1 mt-2 bg-gray-dark text-white rounded w-full hover:bg-gray"
                type="submit"
              >
                Log In
              </button>
            </form>
          ) : (
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="text-center">{username}</div>
              <button
                className="py-1 mt-2 bg-gray-dark text-white rounded w-full hover:bg-gray"
                role="menuitem"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
