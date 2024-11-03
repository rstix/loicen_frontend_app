import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';

const ChangeLanguage = () => {
  const [language, setLanguage] = useState('English');
  const apiUrl = process.env.NEXT_PUBLIC_API_GPU_URL;
  const { data: session, status } = useSession();
  const languages = ['English', 'German'];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpdateLanguage = async () => {
      try {
        const response = await fetch(
          `https://${apiUrl}/update-language/${session?.user?.email}?language=${language}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log(response);

        if (response.ok) {
          const data = await response.json();
          console.log(`Success: ${data.status}`);
        } else {
          const errorData = await response.json();
          console.log(`Error: ${JSON.stringify(errorData)}`);
        }
      } catch (error: any) {
        console.log(`Error: ${error.message}`);
      }
    };
    if (status === 'authenticated') {
      handleUpdateLanguage();
    }
  }, [language, status, session, apiUrl]);

  const handleLanguageSelect = (language: string) => {
    setLanguage(language);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-32" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer px-4 py-2 text-text hover:bg-background_second_hover transition-all duration-150 rounded-lg flex justify-between items-center"
      >
        {language}
        <svg
          className={`w-4 h-4 text-text transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute w-full mt-2 p-2 bg-background_second  border border-border rounded-lg z-50">
          {languages.map((lang, index) => (
            <div
              key={index}
              onClick={() => handleLanguageSelect(lang)}
              className="cursor-pointer px-4 py-2 hover:bg-background_second_hover rounded transition-all duration-150 text-text"
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeLanguage;
