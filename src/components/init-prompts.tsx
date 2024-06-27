import React from 'react';

interface InitPromptsProps {
  fillInput: (text: string, index: number) => void;
  prompts: string[];
}

const InitPrompts = ({ fillInput, prompts }: InitPromptsProps) => {
  const initPrompts = [
    'What are the typical legal outcomes and cost apportionments in German civil cases involving car rental and accident-related claims, based on the rulings from the Aachen, Altena, and Bautzen district courts?',
    'What legal requirements must be met for a car leasing contract to be considered valid under German law, and how do these requirements protect both the lessee and lessor?',
    'How do German laws regulate the end-of-lease process for car leasing, including the assessment of vehicle condition, mileage limits, and any applicable fees for excess wear and tear?',
  ];
  const handleClick = (prompt: string, index: number) => {
    fillInput(prompt, index);
  };
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
