'use client';
import React, { useEffect } from 'react';

interface InitPromptsProps {
  fillInput: (text: string, index: number) => void;
  prompts: string[];
}

const InitPrompts = ({ fillInput, prompts }: InitPromptsProps) => {
  const initPrompts = [
    'What are the typical legal outcomes and cost apportionments in German civil cases involving car rental and accident-related claims, based on the rulings from the Aachen, Altena, and Bautzen district courts?',
    'What legal requirements must be met for a car leasing contract to be considered valid under German law, and how do these requirements protect both the lessee and lessor?',
    "I am lookin for this name 'AG Altena_Anerkenntnisurteil_Geschädigte'",
  ];
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleClick = (prompt: string, index: number) => {
    fillInput(prompt, index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/chat/reset`);
        // const data = await response.json();
        // You can process the data here and use it as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {prompts.map((prompt, index) => (
        <div
          key={prompt}
          className="border border-gray py-1 px-2 rounded transition hover:text-gray-light hover:bg-gray cursor-pointer"
          onClick={() => handleClick(prompt, index)}
        >
          {prompt}
        </div>
      ))}
    </>
  );
};

export default InitPrompts;
