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
  console.log(process.env.NEXT_PUBLIC_API_WEBSOCKET_MOCKUP);

  const handleClick = (prompt: string, index: number) => {
    fillInput(prompt, index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${apiUrl}/chat/reset`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const startPod = async () => {
      try {
        await fetch(`${apiUrl}/chat/start-any`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    startPod();
    fetchData();
  }, [apiUrl]);

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
