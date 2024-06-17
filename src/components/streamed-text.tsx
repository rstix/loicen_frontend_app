import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Messages } from '@/interfaces/messages';

interface StreamedTextProps {
  messages: Messages[];
}

const StreamedText = ({ messages }: StreamedTextProps) => {
  return (
    <>
      {messages.map((item: Messages, index: number) => (
        <div key={index} className="mb-8 flex flex-col">
          {item.isUser ? (
            <div className="bg-gray self-end max-w-[80%] py-2 px-4 rounded-lg">
              {item.text}
            </div>
          ) : (
            <div className="markdown">
              {/* <>{item.text}</> */}
              <Markdown remarkPlugins={[remarkGfm]}>{item.text}</Markdown>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default StreamedText;
