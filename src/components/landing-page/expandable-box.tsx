'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ExpandableBoxProps {
  headline: string;
  text: string;
  isOpen: boolean;
}

const ExpandableBox = ({ headline, text, isOpen }: ExpandableBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleBox = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`border border-gray-light rounded-lg p-4 mb-4 transition-colors duration-300 ${
        isExpanded ? 'bg-gray-light' : 'bg-white'
      }`}
    >
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={toggleBox}
      >
        <h4 className="text-[24px] font-bold">{headline}</h4>
        {isExpanded ? (
          <Image src="/icons/minus.svg" width={16} height={16} alt="minus" />
        ) : (
          <Image src="/icons/plus.svg" width={16} height={16} alt="plus" />
        )}
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? contentRef.current?.scrollHeight : 0,
          marginTop: isExpanded ? '15px' : 0,
        }}
        className={`overflow-hidden transition-max-height duration-300 ease-in-out`}
      >
        <div>{text}</div>
      </div>
    </div>
  );
};

export default ExpandableBox;
