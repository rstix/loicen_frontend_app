'use client';
import React, { useState, useEffect, useRef } from 'react';

import Image from 'next/image';
import amazonS3 from '../../public/icons/amazon-s3.svg';
import googleDrive from '../../public/icons/google-drive.svg';
import uploadFiles from '../../public/icons/upload-files.svg';
import cross from '../../public/cross.svg';
import logout from '../../public/icons/log-out.svg';
import ChangeLanguage from './chat/change-language';
import IntegrationIcon from './icon/integration-icon';
import SettingsIcon from './icon/settings-icon';
import AccoutIcon from './icon/acount-icon';
import SignOutIcon from './icon/sign-out-icon';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log('Files uploaded:', files);
    }
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
    <div className="flex relative justify-between w-full pt-2 pb-1 px-4">
      <ChangeLanguage></ChangeLanguage>
      {/* <Image
        onClick={toggleDropdown}
        className="cursor-pointer"
        src={userIcon}
        width={35}
        alt="user icon"
      /> */}
      <div
        className="rounded-full w-8 h-8 bg-background  flex justify-center items-center cursor-pointer border border-border"
        onClick={toggleDropdown}
      >
        RS
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="origin-top-right absolute right-2 top-[100%] mt-1 rounded-md bg-background border border-border shadow-lg focus:outline-none flex flex-col items-start min-w-44 p-3 z-50"
        >
          <button className="py-1.5 px-2 text-sm cursor-pointer hover:bg-background_second rounded transition-all duration-300 w-full flex gap-2 items-center">
            <div className="w-5 h-5">
              <AccoutIcon />
            </div>
            My Account
          </button>
          <button className="py-1.5 px-2 text-sm cursor-pointer hover:bg-background_second rounded transition-all duration-300 w-full flex gap-2 items-center">
            <div className="w-5 h-5">
              <SettingsIcon />
            </div>
            Settings
          </button>
          <button
            className="py-1.5 px-2 text-sm cursor-pointer hover:bg-background_second rounded transition-all duration-300 w-full flex gap-2 items-center"
            onClick={openModal}
          >
            <div className="w-5 h-5">
              <IntegrationIcon />
            </div>
            Integrations
          </button>
          <button className="py-1.5 px-2 text-sm cursor-pointer hover:bg-background_second rounded transition-all duration-300 w-full flex gap-2 items-center">
            <div className="w-5 h-5">
              <SignOutIcon />
            </div>
            Log Out
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-background_second bg-opacity-100 relative border p-8 rounded-lg shadow-lg max-w-lg w-full">
            <button
              className="top-3 right-3 absolute hover:bg-background_second p-1.5 transition-all duration-150 rounded-full"
              onClick={closeModal}
            >
              <Image src={cross} width={15} alt="close" />
            </button>
            <h3 className="text-lg mb-4 font-semibold border-b border-border pb-2">
              Add a Data Source
            </h3>
            <div className="flex justify-around items-center mb-4">
              <button className=" py-2 px-4 rounded flex flex-col justify-center items-center gap-2 border border-border bg-background/30 hover:bg-background/30">
                <Image
                  className="cursor-pointer"
                  src={uploadFiles}
                  width={65}
                  alt="user icon"
                />
                Manual Upload
              </button>
              <button className="bg-gray-400 py-2 px-4 rounded flex flex-col justify-center items-center gap-2 hover:bg-gray/30">
                <Image
                  className="cursor-pointer"
                  src={googleDrive}
                  width={65}
                  alt="user icon"
                />
                Google Drive
              </button>
              <button className="bg-gray-400 py-2 px-4 rounded flex flex-col justify-center items-center gap-2 hover:bg-gray/30">
                <Image
                  className="cursor-pointer"
                  src={amazonS3}
                  width={65}
                  alt="user icon"
                />
                Amazon S3
              </button>
            </div>
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-4 p-2 border rounded text-text"
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full mb-4 p-2 border rounded text-text"
            />
            <label
              htmlFor="file-upload"
              className="block border border-dashed rounded  p-6 text-center cursor-pointer"
            >
              <p className="mb-2">
                Drop files here or{' '}
                <span className="text-blue-500 underline">click to upload</span>
              </p>
              <p className="text-sm text-gray-500">max size: 500GB</p>
              <p className="text-xs text-gray-500">
                supported files: pdf, jpg, jpeg, png, doc, docx, txt, zip
              </p>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              className="mt-4 bg-black hover:bg-black/50 transition-all duration-300 text-white py-2 px-4 rounded flex justify-center w-full"
              onClick={closeModal}
            >
              Create Dataset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
