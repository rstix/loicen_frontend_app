'use client';

import { useEffect, useRef, useState } from 'react';
import AccoutIcon from '../icon/acount-icon';
import IntegrationIcon from '../icon/integration-icon';
import SettingsIcon from '../icon/settings-icon';

import Image from 'next/image';
import amazonS3 from '../../../public/icons/amazon-s3.svg';
import googleDrive from '../../../public/icons/google-drive.svg';
import uploadFiles from '../../../public/icons/upload-files.svg';
import cross from '../../../public/cross.svg';
import logout from '../../../public/icons/log-out.svg';
import SupportIcon from '../icon/support-icon';
import SignOutIcon from '../icon/sign-out-icon';

interface ActiveChat {
  title: string;
  active: boolean;
}

interface SidebarProps {
  titles: ActiveChat[];
}

const Sidebar = ({ titles }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);

  const chatTitles = [
    {
      de: 'Rechtsberatung zu Vertragsangelegenheiten',
      en: 'Legal advice on contract matters',
    },
    {
      de: 'Unterstützung bei der Fallrecherche',
      en: 'Support with case research',
    },
    {
      de: 'Fragen zur Datenverarbeitung und Datenschutz',
      en: 'Questions on data processing and data protection',
    },
    {
      de: 'Vorbereitung auf eine Gerichtsverhandlung',
      en: 'Preparation for a court hearing',
    },
    // {
    //   de: 'Analyse von Rechtsprechung und Gesetzesänderungen',
    //   en: 'Analysis of case law and legislative changes',
    // },
  ];

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
      setUploadedFiles(files);
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

  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   if (uploadedFiles && uploadedFiles.length > 0) {
  //     const file = uploadedFiles[0];
  //     const totalSizeMB = file.size / (1024 * 1024);
  //     console.log(totalSizeMB); // File size in MB
  //     let currentProgress = 0;

  //     const interval = setInterval(() => {
  //       currentProgress += 1; // Increment by 1MB per second
  //       setProgress((currentProgress / totalSizeMB) * 100); // Update progress percentage

  //       if (currentProgress >= totalSizeMB) {
  //         clearInterval(interval); // Stop the interval when upload completes
  //       }
  //     }, 30); // 1 second per MB

  //     return () => clearInterval(interval); // Clean up interval on unmount
  //   }
  // }, [uploadedFiles]);

  const upload = () => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      const file = uploadedFiles[0];
      const totalSizeMB = file.size / (1024 * 1024);
      console.log(totalSizeMB); // File size in MB
      let currentProgress = 0;

      const interval = setInterval(() => {
        currentProgress += 1; // Increment by 1MB per second
        setProgress((currentProgress / totalSizeMB) * 100); // Update progress percentage

        if (currentProgress >= totalSizeMB) {
          clearInterval(interval); // Stop the interval when upload completes
        }
      }, 30); // 1 second per MB

      return () => clearInterval(interval); // Clean up interval on unmount
    }
  };

  return (
    <>
      <div className="w-full bg-background_second text-text h-screen p-4">
        {/* User Profile */}
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-2 mb-8">
            <div className="rounded-full w-[30px] h-[30px] bg-background text-text/60 text-sm flex justify-center items-center cursor-pointer border border-border/80">
              RS
            </div>
            <span className="font-semibold ">Roman Stix</span>
          </div>

          <div className="mb-10">
            <button className="py-2 px-2 text-sm cursor-pointer hover:bg-background_second_hover rounded transition-all duration-300 w-full flex gap-2 items-center">
              <div className="w-5 h-5">
                <AccoutIcon />
              </div>
              My Account
            </button>
            <button className="py-2 px-2 text-sm cursor-pointer hover:bg-background_second_hover rounded transition-all duration-300 w-full flex gap-2 items-center">
              <div className="w-5 h-5">
                <SettingsIcon />
              </div>
              Settings
            </button>
            <button
              className="py-1.5 px-2 text-sm cursor-pointer hover:bg-background_second_hover rounded transition-all duration-300 w-full flex gap-2 items-center"
              onClick={openModal}
            >
              <div className="w-5 h-5">
                <IntegrationIcon />
              </div>
              Integrations
            </button>
          </div>

          {/* Active Cases */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Active chats</h3>
            <ul className="space-y-1">
              {titles.map((el) => (
                <li
                  key={el.title}
                  className={`relative text-sm cursor-pointer hover:bg-background_second_hover p-2 rounded overflow-hidden whitespace-nowrap ${
                    el.active && 'bg-background_second_hover'
                  }`}
                >
                  <div className="scroll-on-hover inline-block">{el.title}</div>
                  <span className="absolute top-0 right-0 h-full w-[40px] bg-gradient-to-l from-background_second hover:from-background to-transparent"></span>
                </li>
              ))}
            </ul>
          </div>
          {/* Archive */}
          <div className="mb-auto">
            <h3 className="text-sm font-semibold  mb-2">Saved chats</h3>
            <ul className="space-y-1">
              {chatTitles.map((title) => (
                <li
                  key={title.de}
                  className="relative text-sm cursor-pointer hover:bg-background_second_hover p-2 rounded overflow-hidden whitespace-nowrap"
                >
                  <div className="scroll-on-hover inline-block">{title.en}</div>
                  <span className="absolute top-0 right-0 h-full w-[40px] bg-gradient-to-l from-background_second hover:from-background to-transparent"></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex gap-2 justify-evenly">
            <button className="flex items-center space-x-2 text-xs px-3 py-1.5 hover:bg-background_second_hover transition-all duration-150 rounded-lg border border-border">
              <div className="h-[14px] w-[14x]">
                <SupportIcon />
              </div>
              <span>Support</span>
            </button>
            <button className="flex items-center space-x-2 text-xs px-3 py-1.5 hover:bg-background_second_hover transition-all duration-150 rounded-lg border border-border">
              <div className="h-[14px] w-[14px]">
                <SignOutIcon />
              </div>
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>

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
              {uploadedFiles ? (
                <div className="relative">
                  <p className="mb-2 text-green-500">Files ready for upload:</p>
                  <ul className="text-sm text-gray-600 mb-2">
                    {Array.from(uploadedFiles).map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>

                  {progress > 0 && (
                    <>
                      <div className="relative w-full h-2 mt-4 bg-black/15 rounded overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-black transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      {/* Percentage display */}
                      {progress < 100 ? (
                        <p className="text-xs  mt-2">
                          Uploading... {Math.floor(progress)}%
                        </p>
                      ) : (
                        <>
                          <p className="text-xs mt-2 font-semibold">Uploaded</p>
                          <p className="text-xs font-medium">
                            You can now close this modal. Your dataset was
                            created, enjoy chatting with your data.
                          </p>
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <p className="mb-2">
                    Drop files here or{' '}
                    <span className="text-blue-500 underline">
                      click to upload
                    </span>
                  </p>
                  <p className="text-sm ">max size: 500GB</p>
                  <p className="text-xs ">
                    supported files: pdf, jpg, jpeg, png, doc, docx, txt, zip
                  </p>
                </div>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              className={`mt-4 py-2 px-4 rounded flex justify-center w-full transition-all duration-300 border border-border text-button_text ${
                uploadedFiles
                  ? 'bg-button hover:bg-button/80  cursor-pointer'
                  : 'bg-button/60 cursor-not-allowed'
              }`}
              onClick={upload}
            >
              {progress > 0 ? 'Cancel Upload' : 'Create Dataset'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
