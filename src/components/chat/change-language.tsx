import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ChangeLanguage = () => {
  const [language, setLanguage] = useState('English');
  const apiUrl = process.env.NEXT_PUBLIC_API_GPU_URL;
  const { data: session, status } = useSession();
  const languages = ['English', 'German'];
  const [isOpen, setIsOpen] = useState(false);

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
  }, [language, status]);

  const handleLanguageSelect = (language: string) => {
    setLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-32">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer px-4 py-2  text-white hover:bg-black/20 transition-all duration-300 rounded-lg flex justify-between items-center"
      >
        {language}
        <svg
          className={`w-4 h-4 text-white transition-transform ${
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
        <div className="absolute w-full mt-2 p-2 bg-gray border border-gray-light rounded-lg z-50">
          {languages.map((lang, index) => (
            <div
              key={index}
              onClick={() => handleLanguageSelect(lang)}
              className="cursor-pointer px-4 py-2 hover:bg-black/20 rounded transition-all duration-150 text-white"
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
