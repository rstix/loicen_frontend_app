// 'use client';

// import { useState } from 'react';
// import InputPrompt from '../input-prompt';
// import { Sources } from '@/interfaces/messages';
// import FeedbackSwitcher from './feedback-switcher';

// interface FileFeedbackProps {
//   source: Sources;
//   // onSendFeedback: (feedback: string) => void;
//   handleSourceClick: (source: Sources) => void;
// }

// const FileFeedback = ({
//   source,
//   // onSendFeedback,
//   handleSourceClick,
// }: FileFeedbackProps) => {
//   const [feedback, setFeedback] = useState<string>('');
//   const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);

//   const sendFeedback = () => {
//     // onSendFeedback(feedback);
//     setFeedback('');
//   };

//   return (
//     <div className="text-sm text-gray-darker">
//       <div className="flex justify-end gap-2">
//         <div
//           className={`flex w-max items-center gap-2 cursor-pointer border transition border-gray rounded py-[0px] px-2 hover:text-gray-light  hover:bg-gray ${
//             feedbackOpen ? 'bg-gray' : 'bg-gray-dark'
//           }`}
//           onClick={() => setFeedbackOpen(!feedbackOpen)}
//         >
//           <span>Feedback</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="15"
//             height="7"
//             viewBox="0 0 20 11"
//             id="arrow"
//             className={`transition ${feedbackOpen ? '' : 'rotate-180'}`}
//           >
//             <g fill="none" fillRule="evenodd">
//               <g fill="#C6C6C6" transform="translate(-260 -6684)">
//                 <g transform="translate(56 160)">
//                   <path d="M223.708 6534.634c.39-.405.39-1.06 0-1.464l-8.264-8.563a1.95 1.95 0 0 0-2.827 0l-8.325 8.625c-.385.4-.39 1.048-.01 1.454a.976.976 0 0 0 1.425.01l7.617-7.893a.975.975 0 0 1 1.414 0l7.557 7.83a.974.974 0 0 0 1.413 0"></path>
//                 </g>
//               </g>
//             </g>
//           </svg>
//         </div>
//         <div className="self-end cursor-pointer p-1">
//           <button onClick={() => handleSourceClick(source)}>
//             {source.relevant ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 40 40"
//                 width="18"
//                 height="18"
//                 fill="#C6C6C6"
//                 id="recycle-bin"
//               >
//                 <path d="M28 40H11.8c-3.3 0-5.9-2.7-5.9-5.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 2.2 1.8 3.9 3.9 3.9H28c2.2 0 3.9-1.8 3.9-3.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 3.2-2.7 5.9-5.9 5.9zM33.3 4.9h-7.6C25.2 2.1 22.8 0 19.9 0s-5.3 2.1-5.8 4.9H6.5C4.2 4.9 2.4 6.7 2.4 9s1.8 4 4.1 4h26.9c2.3 0 4.1-1.8 4.1-4.1s-1.9-4-4.2-4zM19.9 2c1.8 0 3.3 1.2 3.7 2.9h-7.5c.5-1.7 2-2.9 3.8-2.9zm13.4 9H6.5c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1h26.9c1.1 0 2.1.9 2.1 2.1-.1 1.2-1 2.1-2.2 2.1z"></path>
//                 <path d="M12.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM26.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM19.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1z"></path>
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 64 64"
//                 width="20"
//                 height="20"
//                 fill="#C6C6C6"
//                 id="undo"
//               >
//                 <path d="M8.49 36.85a2 2 0 0 1 2 1.94A21.55 21.55 0 1 0 32 17.46H14.2l13.13 10.1a1.93 1.93 0 0 1 .34 2.72 2 2 0 0 1-1.31.74 2 2 0 0 1-1.44-.4L7.29 17.05a.76.76 0 0 1-.18-.18l-.25-.28v-.05a1.89 1.89 0 0 1-.23-.5v-.14a2.45 2.45 0 0 1 0-.54v-.2l.06-.28a1.27 1.27 0 0 1 .09-.18.94.94 0 0 1 .12-.22 2 2 0 0 1 .27-.33L24.92.41a2 2 0 0 1 2.75.34 1.93 1.93 0 0 1-.34 2.72L14.2 13.58H32A25.21 25.21 0 1 1 6.54 38.79a1.94 1.94 0 0 1 1.95-1.94Z"></path>
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {feedbackOpen && (
//         <>
//           <div className="my-2">
//             <FeedbackSwitcher />
//           </div>

//           <InputPrompt
//             onSend={sendFeedback}
//             message={feedback}
//             placeholder="Type your feedback"
//             border={false}
//             small={true}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default FileFeedback;

'use client';

import { useState } from 'react';
import InputPrompt from '../input-prompt';
import { Sources } from '@/interfaces/messages';
import FeedbackSwitcher from './feedback-switcher';

interface FileFeedbackProps {
  source: Sources;
  // onSendFeedback: (feedback: string) => void;
  handleSourceClick: (source: Sources) => void;
}

const FileFeedback = ({
  source,
  // onSendFeedback,
  handleSourceClick,
}: FileFeedbackProps) => {
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const [feedbackLike, setFeedbackLike] = useState<number>(-10);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const sendFeedback = async (text: string) => {
    try {
      const response = await fetch(`${apiUrl}/feedback/file`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          like: feedbackLike,
          text: text,
          file_id: source.file_id,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Feedback sent successfully:', data);
    } catch (error) {
      console.error('Failed to send feedback:', error);
    }
    setFeedback('');
  };

  const getFeedbackLike = (val: number) => {
    console.log(val - 1);
    setFeedbackLike(val - 1);
  };

  const handleFeedbackClick = () => {
    setFeedbackOpen((prev) => !prev);
  };

  return (
    <div className="text-sm text-gray-darker">
      <div className="flex justify-end gap-2">
        <div
          className={`flex w-max items-center gap-2 cursor-pointer border transition border-gray rounded py-[0px] px-2 hover:text-gray-light  hover:bg-gray ${
            feedbackOpen ? 'bg-gray' : 'bg-gray-dark'
          }`}
          onClick={handleFeedbackClick}
        >
          <span>Feedback</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="7"
            viewBox="0 0 20 11"
            id="arrow"
            className={`transition ${feedbackOpen ? '' : 'rotate-180'}`}
          >
            <g fill="none" fillRule="evenodd">
              <g fill="#C6C6C6" transform="translate(-260 -6684)">
                <g transform="translate(56 160)">
                  <path d="M223.708 6534.634c.39-.405.39-1.06 0-1.464l-8.264-8.563a1.95 1.95 0 0 0-2.827 0l-8.325 8.625c-.385.4-.39 1.048-.01 1.454a.976.976 0 0 0 1.425.01l7.617-7.893a.975.975 0 0 1 1.414 0l7.557 7.83a.974.974 0 0 0 1.413 0"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className="self-end cursor-pointer p-1">
          <button onClick={() => handleSourceClick(source)}>
            {source.relevant ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width="18"
                height="18"
                fill="#C6C6C6"
                id="recycle-bin"
              >
                <path d="M28 40H11.8c-3.3 0-5.9-2.7-5.9-5.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 2.2 1.8 3.9 3.9 3.9H28c2.2 0 3.9-1.8 3.9-3.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 3.2-2.7 5.9-5.9 5.9zM33.3 4.9h-7.6C25.2 2.1 22.8 0 19.9 0s-5.3 2.1-5.8 4.9H6.5C4.2 4.9 2.4 6.7 2.4 9s1.8 4 4.1 4h26.9c2.3 0 4.1-1.8 4.1-4.1s-1.9-4-4.2-4zM19.9 2c1.8 0 3.3 1.2 3.7 2.9h-7.5c.5-1.7 2-2.9 3.8-2.9zm13.4 9H6.5c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1h26.9c1.1 0 2.1.9 2.1 2.1-.1 1.2-1 2.1-2.2 2.1z"></path>
                <path d="M12.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM26.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1zM19.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="20"
                height="20"
                fill="#C6C6C6"
                id="undo"
              >
                <path d="M8.49 36.85a2 2 0 0 1 2 1.94A21.55 21.55 0 1 0 32 17.46H14.2l13.13 10.1a1.93 1.93 0 0 1 .34 2.72 2 2 0 0 1-1.31.74 2 2 0 0 1-1.44-.4L7.29 17.05a.76.76 0 0 1-.18-.18l-.25-.28v-.05a1.89 1.89 0 0 1-.23-.5v-.14a2.45 2.45 0 0 1 0-.54v-.2l.06-.28a1.27 1.27 0 0 1 .09-.18.94.94 0 0 1 .12-.22 2 2 0 0 1 .27-.33L24.92.41a2 2 0 0 1 2.75.34 1.93 1.93 0 0 1-.34 2.72L14.2 13.58H32A25.21 25.21 0 1 1 6.54 38.79a1.94 1.94 0 0 1 1.95-1.94Z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {feedbackOpen && (
        <>
          <div className="my-2">
            <FeedbackSwitcher getFeedbackLike={getFeedbackLike} />
          </div>

          <InputPrompt
            onSend={sendFeedback}
            message={feedback}
            placeholder="Type your feedback"
            border={false}
            small={true}
          />
        </>
      )}
    </div>
  );
};

export default FileFeedback;
