'use client';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface InitPromptsProps {
  fillInput: (text: string, index: number) => void;
  prompts: string[];
  // ip: string;
  // publicPort: string;
  // activePod: string;
}

const InitPrompts = ({
  fillInput,
  prompts,
}: // ip,
// publicPort,
// activePod,
InitPromptsProps) => {
  const initPrompts = [
    'What are the typical legal outcomes and cost apportionments in German civil cases involving car rental and accident-related claims, based on the rulings from the Aachen, Altena, and Bautzen district courts?',
    'What legal requirements must be met for a car leasing contract to be considered valid under German law, and how do these requirements protect both the lessee and lessor?',
    "I am lookin for this name 'AG Altena_Anerkenntnisurteil_Geschädigte'",
  ];
  const apiUrl = process.env.NEXT_PUBLIC_API_GPU_URL;
  // console.log(process.env.NEXT_PUBLIC_API_WEBSOCKET_MOCKUP);

  const handleClick = (prompt: string, index: number) => {
    fillInput(prompt, index);
  };

  useEffect(() => {
    const resetPod = async () => {
      // try {
      //   const res = await fetch(`${apiUrl}/chat/reset/test`);
      //   // const res = await fetch(`${apiUrl}/chat/reset/test`);
      // } catch (error) {
      //   console.error('Error reseting:', error);
      // }

      try {
        // Directly call your FastAPI backend with the full URL
        const response = await fetch(`https://${apiUrl}/reset/test`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.status); // Show success message
        } else {
          const errorData = await response.json();
          console.log(`Error: ${errorData.detail}`); // Handle error response
        }
      } catch (error: any) {
        console.log(`Request failed: ${error.message}`); // Handle request failure
      }
    };

    // const startPod = async () => {
    //   try {
    //     await fetch(`${apiUrl}/chat/start-any`);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // if (ip && publicPort && activePod) resetPod();
    resetPod();
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
