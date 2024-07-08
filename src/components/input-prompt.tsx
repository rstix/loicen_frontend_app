'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import send from '../../public/send.svg';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder: string;
  border: boolean;
  small: boolean;
  message: string;
  autoFocus?: boolean;
}

const InputPrompt = ({
  onSend,
  placeholder,
  border,
  small,
  message,
  autoFocus = false,
}: ChatInputProps) => {
  const [input, setInput] = useState<string>(message);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

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
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input, message]);

  useEffect(() => {
    setInput(message);
  }, [message]);

  return (
    <>
      <form
        className={`rounded-lg bg-gray max-w-[650px] flex my-2 ${
          border && 'border'
        } ${small ? 'p-[6px]' : 'p-3'}`}
        onSubmit={handleSend}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          dir="auto"
          className="bg-gray outline-none flex-1 resize-none"
          value={input}
          onChange={handleInput}
          placeholder={placeholder}
        />
        <button type="submit" className="self-end mb-[1px]">
          <Image src={send} alt="file icon" width={small ? 18 : 22} />
        </button>
      </form>
    </>
  );
};

export default InputPrompt;
