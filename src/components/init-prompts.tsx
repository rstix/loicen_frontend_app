'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

interface InitPromptsProps {
  fillInput: (text: string, index: number) => void;
  prompts: string[];
}

const InitPrompts = ({ fillInput, prompts }: InitPromptsProps) => {
  const initPrompts = [
    'What are the typical legal outcomes and cost apportionments in German civil cases involving car rental and accident-related claims, based on the rulings from the Aachen, Altena, and Bautzen district courts?',
    // 'What legal requirements must be met for a car leasing contract to be considered valid under German law, and how do these requirements protect both the lessee and lessor?',
    'What evidence or documents do you have for claims regarding damage that occurred in Feucht between May 12, 2020, and November 26, 2023?',
    'What is the basis for estimating rental car costs at AG Stuttgart? List the last three relevant decisions.',
  ];
  const apiUrl = process.env.NEXT_PUBLIC_API_GPU_URL;
  const { data: session, status } = useSession();

  const handleClick = (prompt: string, index: number) => {
    fillInput(prompt, index);
  };

  useEffect(() => {
    const resetPod = async () => {
      try {
        const response = await fetch(
          `https://${apiUrl}/reset/${session?.user?.email}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log(response);

        if (response.ok) {
          const result = await response.json();
          console.log(result.status);
        } else {
          const errorData = await response.json();
          console.log(`Error: ${errorData.detail}`);
        }
      } catch (error: any) {
        console.log(`Request failed: ${error.message}`);
      }
    };

    if (status === 'authenticated') {
      resetPod();
    }
  }, [apiUrl, status]);

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
