'use client';

import { useState } from 'react';
import FeedbackMode from './feedback-mode';
import Image from 'next/image';
import feedback from '../../../public/feedback.svg';

const OpenButton = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };
  return (
    <>
      <button
        onClick={handleOpenOverlay}
        className="text-white border border-gray overflow-hidden group relative flex items-center text-white px-2 pb-1 pt-[6px] rounded-lg transition-all duration-700"
      >
        <Image
          className="max-h-[24px] mx-1"
          src={feedback}
          alt="feedback icon"
          width={20}
          height={20}
        />
        <span className="max-w-0 text-xs overflow-hidden whitespace-nowrap transition-all duration-700 group-hover:max-w-xs">
          Feedback Mode
        </span>
      </button>
      {isOverlayOpen && <FeedbackMode onClose={handleCloseOverlay} />}
    </>
  );
};

export default OpenButton;
