// import { useState, useEffect } from 'react';
// import InputPrompt from '../input-prompt';
// import Image from 'next/image';
// import cross from '../../../public/cross.svg';

// interface FeedbackModeProps {
//   onClose: () => void;
// }

// const FeedbackMode = ({ onClose }: FeedbackModeProps) => {
//   const [inputPosition, setInputPosition] = useState<{
//     x: number;
//     y: number;
//     position: 'left' | 'right';
//   } | null>(null);

//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const handleOverlayClick = (e: React.MouseEvent) => {
//     const clickX = e.clientX;
//     const clickY = e.clientY;
//     const windowWidth = window.innerWidth;

//     let position: 'left' | 'right' = 'left';

//     if (clickX > (2 * windowWidth) / 3) {
//       position = 'right';
//     } else {
//       position = 'left';
//     }

//     setInputPosition({ x: clickX, y: clickY, position });
//   };

//   const handleSend = (message: string) => {
//     console.log('Message sent:', message);
//     setInputPosition(null);
//   };

//   const handleClose = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsVisible(false);
//     setTimeout(onClose, 300); // Match the duration of the slide transition
//   };

//   return (
//     <div
//       className={`fixed z-50 w-screen h-screen inset-0 bg-black bg-opacity-70 flex items-center justify-center cursor-comment transform transition-transform duration-300 ${
//         isVisible ? 'translate-x-0' : '-translate-x-full'
//       }`}
//       onClick={handleOverlayClick}
//     >
//       <button
//         onClick={handleClose}
//         className="absolute top-2 right-2 text-white p-1 rounded"
//       >
//         <Image
//           className="max-h-[24px] mx-1"
//           src={cross}
//           alt="feedback icon"
//           width={20}
//           height={20}
//         />
//       </button>
//       {inputPosition && (
//         <div
//           style={{
//             position: 'absolute',
//             top: inputPosition.y + 15,
//             left:
//               inputPosition.position === 'left' ? inputPosition.x : undefined,
//             right:
//               inputPosition.position === 'right'
//                 ? window.innerWidth - inputPosition.x
//                 : undefined,
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <InputPrompt
//             onSend={handleSend}
//             placeholder="Type your feedback"
//             border={false}
//             small={true}
//             message=""
//             autoFocus={true}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeedbackMode;

import { useState, useEffect } from 'react';
import InputPrompt from '../input-prompt';
import Image from 'next/image';
import cross from '../../../public/cross.svg';
import feedbackIcon from '../../../public/feedback.svg'; // Make sure to import your feedback icon

interface FeedbackModeProps {
  onClose: () => void;
}

const FeedbackMode = ({ onClose }: FeedbackModeProps) => {
  const [inputPosition, setInputPosition] = useState<{
    x: number;
    y: number;
    position: 'left' | 'right';
  } | null>(null);

  const [feedbacks, setFeedbacks] = useState<
    { x: number; y: number; message: string }[]
  >([]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    const clickX = e.clientX;
    const clickY = e.clientY;
    const windowWidth = window.innerWidth;

    let position: 'left' | 'right' = 'left';

    if (clickX > (2 * windowWidth) / 3) {
      position = 'right';
    } else {
      position = 'left';
    }

    setInputPosition({ x: clickX, y: clickY, position });
  };

  const handleSend = (message: string) => {
    console.log('Message sent:', message);
    if (inputPosition) {
      setFeedbacks([
        ...feedbacks,
        { x: inputPosition.x, y: inputPosition.y, message },
      ]);
    }
    setInputPosition(null);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from propagating to the overlay
    setIsVisible(false);
    setTimeout(onClose, 150); // Match the duration of the slide transition
  };

  return (
    <div
      className={`fixed z-50 w-screen h-screen inset-0 bg-black bg-opacity-70 flex items-center justify-center cursor-comment transform transition-transform duration-150 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
      onClick={handleOverlayClick}
    >
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-white p-1 rounded"
      >
        <Image
          className="max-h-[24px] mx-1"
          src={cross}
          alt="feedback icon"
          width={20}
          height={20}
        />
      </button>
      {inputPosition && (
        <div
          style={{
            position: 'absolute',
            top: inputPosition.y + 15,
            left:
              inputPosition.position === 'left' ? inputPosition.x : undefined,
            right:
              inputPosition.position === 'right'
                ? window.innerWidth - inputPosition.x
                : undefined,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <InputPrompt
            onSend={handleSend}
            placeholder="Type your feedback"
            border={false}
            small={true}
            message=""
            autoFocus={true}
          />
        </div>
      )}
      {feedbacks.map((feedback, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: feedback.y,
            left: feedback.x,
          }}
        >
          <Image
            className="h-6 w-6"
            src={feedbackIcon}
            alt="feedback icon"
            width={24}
            height={24}
          />
        </div>
      ))}
    </div>
  );
};

export default FeedbackMode;
