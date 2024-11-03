'use client';
import React, { useState, useEffect, useRef } from 'react';

import ChangeLanguage from './chat/change-language';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [titleKey, setTitleKey] = useState(0); // Unique key for title element

  useEffect(() => {
    // Change the key to force re-render for each new title
    setTitleKey((prevKey) => prevKey + 1);
  }, [title]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    toggleDropdown();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex justify-between items-center w-full pt-2 pb-1 px-4">
      <ChangeLanguage />
      <div
        key={titleKey} // New key to trigger re-render on title change
        className="chat-title h-full transition-opacity transform duration-500 opacity-0 translate-y-2 animate-fadeInStay w-1/2 overflow-hidden whitespace-nowrap"
      >
        <div className="scroll-on-hover inline-block">{title}</div>
        <span className="absolute top-0 right-0 h-full w-[40px] bg-gradient-to-l from-background hover:from-background to-transparent"></span>
      </div>
      <button className="border border-border text-xs px-2 py-1 rounded-lg h-8 hover:bg-background_second_hover transition-all duration-150">
        Clear chat
      </button>
    </div>
  );
};

export default Header;
