import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Messages, Sources } from '@/interfaces/messages';
import MessageFeedback from '@/components/chat/message-feedback';
import FilesProvider from '@/components/files-sidebar/files-provider';

interface StreamedTextProps {
  messages: Messages[];
  onDislike: (id: string) => void;
  sources: Sources[];
}

const StreamedText = ({ messages, onDislike, sources }: StreamedTextProps) => {
  const [openFeedbackId, setOpenFeedbackId] = useState<string | null>(null);
  const [openFilesId, setOpenFilesId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  // console.log(messages);

  const slideoverContainerRef = useRef<HTMLDivElement | null>(null);
  const slideoverBgRef = useRef<HTMLDivElement | null>(null);
  const slideoverRef = useRef<HTMLDivElement | null>(null);

  const feedbackOptions = [
    { id: 1, text: 'Unklare Antwort' },
    { id: 2, text: 'Faktisch nicht korrekt' },
    { id: 3, text: 'Hat die Anweisungen nicht vollständig befolgt' },
    { id: 4, text: 'Unvollständige Antwort' },
    { id: 5, text: 'Nicht relevant' },
    { id: 6, text: 'Zu kurz' },

    // { id: 7, text: 'Inconsistent information' },
  ];

  const closeFeedback = () => {
    setOpenFeedbackId(null);
  };

  const handleDislikeClick = (msg: Messages) => {
    if (msg.dislike) return;
    onDislike(msg.id);
    setOpenFeedbackId(msg.id);
  };

  const sendFeedback = (feedback: string) => {
    console.log(feedback);
    setTimeout(() => {
      closeFeedback();
    }, 300);
  };

  const fillFeedbackInput = (text: string) => {
    setFeedback(text);
  };

  // toggleSlideover;

  const toggleSlideover = (item: Messages) => {
    if (openFilesId == null) {
      setOpenFilesId(item.id);
    } else {
      setOpenFilesId(null);
    }
    // document
    //   .getElementById('slideover-container')
    //   .classList.toggle('invisible');
    // document.getElementById('slideover-bg').classList.toggle('opacity-0');
    // document.getElementById('slideover-bg').classList.toggle('opacity-0');
    // document.getElementById('slideover').classList.toggle('translate-x-full');

    if (slideoverContainerRef.current) {
      slideoverContainerRef.current.classList.toggle('invisible');
    }

    // if (slideoverBgRef.current) {
    //   slideoverBgRef.current.classList.toggle('opacity-0');
    // }

    if (slideoverRef.current) {
      slideoverRef.current.classList.toggle('translate-x-full');
    }
  };

  return (
    <>
      {messages.map((item: Messages, index: number) => (
        <div key={index} className="mb-8 flex flex-col">
          {/* <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown> */}
          {item.status == 'user' ? (
            <div className="bg-gray self-end max-w-[80%] py-2 px-4 rounded-lg">
              {item.text}
            </div>
          ) : (
            <>
              <div
                id="slideover-container"
                ref={slideoverContainerRef}
                className="w-full h-full fixed inset-0 invisible z-50 flex"
              >
                <div
                  onClick={() => toggleSlideover(item)}
                  id="slideover-bg"
                  className="w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-dark opacity-0"
                ></div>
                {/* <div className="flex-1"></div> */}
                <div
                  id="slideover"
                  ref={slideoverRef}
                  className="w-[480px] basis-1/3  bg-gray-very_dark h-full absolute right-0 duration-150 ease-out transition-all translate-x-full "
                >
                  <div className="absolute cursor-pointer text-gray-light top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5 overflow-y-auto">
                    <svg
                      className="w-6 h-6"
                      onClick={() => toggleSlideover(item)}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                  <div className="px-4 pb-6 lg:px-6 pt-14">
                    <FilesProvider sources={sources} lastId={item.id} />
                  </div>
                </div>
              </div>

              <div className="markdown relative">
                {/* <>{item.text}</> */}
                <div
                  onClick={() => toggleSlideover(item)}
                  className={`p-1 rounded ${
                    openFilesId == item.id ? 'bg-gray' : ''
                  }`}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>{item.text}</Markdown>
                </div>
                <div className="flex justify-start mt-2">
                  <button onClick={() => handleDislikeClick(item)}>
                    {item.dislike ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#C6C6C6"
                        viewBox="0 0 128 128"
                        id="dislike"
                      >
                        <path
                          stroke="#C6C6C6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M71.0361 118.999C70.2401 119.08 69.2561 114.086 68.6411 108.992C68.0478 104.079 65.2979 99.5742 61.0488 96.9479C56.3395 94.0372 51.6584 90.6721 48.2004 86.852C44.853 83.154 44 78.0253 44 73.0373V41.687C44 36.8893 47.941 33 52.8024 33H95.2404C97.7721 33 100.531 33.9162 102.588 35.7486C105.364 38.2208 106.141 42.171 107.494 45.6327C110.673 53.7608 116.48 68.9441 116.935 72.5345C117.563 77.4985 113.557 80.601 109.39 80.601H76.2624C80.4378 89.0479 83.8183 106.671 80.4673 114.656C79.1653 117.759 76.0689 118.484 71.0361 118.999Z"
                        ></path>
                        <path
                          stroke="#C6C6C6"
                          strokeWidth="4"
                          d="M11 75C11 77.7614 13.2386 80 16 80H28C30.7614 80 33 77.7614 33 75V38C33 35.2386 30.7614 33 28 33H16C13.2386 33 11 35.2386 11 38V75Z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 128 128"
                        id="dislike"
                      >
                        <path
                          stroke="#C6C6C6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M71.0361 118.999C70.2401 119.08 69.2561 114.086 68.6411 108.992C68.0478 104.079 65.2979 99.5742 61.0488 96.9479C56.3395 94.0372 51.6584 90.6721 48.2004 86.852C44.853 83.154 44 78.0253 44 73.0373V41.687C44 36.8893 47.941 33 52.8024 33H95.2404C97.7721 33 100.531 33.9162 102.588 35.7486C105.364 38.2208 106.141 42.171 107.494 45.6327C110.673 53.7608 116.48 68.9441 116.935 72.5345C117.563 77.4985 113.557 80.601 109.39 80.601H76.2624C80.4378 89.0479 83.8183 106.671 80.4673 114.656C79.1653 117.759 76.0689 118.484 71.0361 118.999Z"
                        ></path>
                        <path
                          stroke="#C6C6C6"
                          strokeWidth="4"
                          d="M11 75C11 77.7614 13.2386 80 16 80H28C30.7614 80 33 77.7614 33 75V38C33 35.2386 30.7614 33 28 33H16C13.2386 33 11 35.2386 11 38V75Z"
                        ></path>
                      </svg>
                    )}
                  </button>
                  {openFeedbackId == item.id && (
                    <MessageFeedback
                      feedbackOptions={feedbackOptions}
                      onClose={closeFeedback}
                      onSendFeedback={sendFeedback}
                      msgId={item.id}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default StreamedText;
