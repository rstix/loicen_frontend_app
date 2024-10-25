import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Messages, Sources } from '@/interfaces/messages';
import MessageFeedback from '@/components/chat/message-feedback';
import FilesProvider from '@/components/files-sidebar/files-provider';
import DislikeIcon from '../icon/dislike-icon';

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

  const toggleSlideover = (item: Messages) => {
    if (openFilesId == null) {
      setOpenFilesId(item.id);
    } else {
      setOpenFilesId(null);
    }
    if (slideoverContainerRef.current) {
      slideoverContainerRef.current.classList.toggle('invisible');
    }

    if (slideoverRef.current) {
      slideoverRef.current.classList.toggle('translate-x-full');
    }
  };

  return (
    <>
      {messages.map((item: Messages, index: number) => (
        <div key={index} className="mb-8 flex flex-col">
          {item.status == 'user' ? (
            <div className="bg-background_second self-end max-w-[80%] py-2 px-4 rounded-lg">
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
                  className="w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-backgound_second opacity-0"
                ></div>
                <div
                  id="slideover"
                  ref={slideoverRef}
                  className="w-[580px] overflow-y-auto basis-1/3  bg-background_second h-full absolute -left-[580px] duration-150 ease-out transition-all z-40"
                >
                  <div className="fixed cursor-pointer text-text top-0 w-8 h-8 flex items-center justify-center left-0 mt-5 mr-5 overflow-y-auto">
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
                <div
                  onClick={() => toggleSlideover(item)}
                  className={`p-1 rounded ${
                    openFilesId == item.id ? 'bg-background_second' : ''
                  }`}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>{item.text}</Markdown>
                </div>
                <div className="flex justify-start mt-2">
                  <button
                    className="w-6 h-6"
                    onClick={() => handleDislikeClick(item)}
                  >
                    {item.dislike ? (
                      <DislikeIcon isFill={true} />
                    ) : (
                      <DislikeIcon isFill={false} />
                    )}
                  </button>
                  {openFeedbackId == item.id && (
                    <MessageFeedback
                      feedbackOptions={feedbackOptions}
                      onClose={closeFeedback}
                      // onSendFeedback={sendFeedback}
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
