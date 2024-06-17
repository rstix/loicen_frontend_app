'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import send from '../../public/send.svg';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const InputPrompt = ({ onSend }: ChatInputProps) => {
  const [input, setInput] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      console.log(textareaRef);
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  return (
    <>
      <form
        className="rounded-lg bg-gray border p-3 max-w-[600px] w-[60%] flex my-2"
        onSubmit={handleSend}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          dir="auto"
          className="bg-gray outline-none flex-1 resize-none"
          value={input}
          onChange={handleInput}
          placeholder="Type your question..."
        />
        <button type="submit" className="self-end">
          <Image src={send} alt="file icon" width={22} />
        </button>
      </form>
    </>
  );
};

export default InputPrompt;
