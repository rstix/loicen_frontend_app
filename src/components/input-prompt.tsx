'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import send from '../../public/send.svg';
import SendIcon from './icon/send-icon';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder: string;
  border: boolean;
  small: boolean;
  message: string;
  autoFocus?: boolean;
  canAsk?: boolean;
}

const InputPrompt = ({
  onSend,
  placeholder,
  border,
  small,
  message,
  autoFocus = false,
  canAsk = true,
}: ChatInputProps) => {
  const [input, setInput] = useState<string>(message);
  const [inputEmptyErr, setInputEmptyErr] = useState<boolean>(false);
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
    } else {
      setInputEmptyErr(true);
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
    setInputEmptyErr(false);
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
      {inputEmptyErr && (
        <div className="text-xs text-red-error">Nicht leer lassen.</div>
      )}
      <form
        className={`rounded-lg max-w-[650px]   flex mb-2 mt-1 ${
          border && 'border border-border'
        } ${small ? 'p-[6px]' : 'p-3'} ${!border && 'bg-background'}`}
        onSubmit={handleSend}
      >
        <textarea
          ref={textareaRef}
          rows={small ? 1 : 2}
          dir="auto"
          className="outline-none bg-background  flex-1 resize-none"
          value={input}
          onChange={handleInput}
          placeholder={placeholder}
        />
        <button
          type="submit"
          className={`self-end justify-end mb-[1px] ${
            canAsk ? '' : 'opacity-60'
          }`}
          disabled={!canAsk}
        >
          {small ? (
            <Image src={send} alt="file icon" width={small ? 18 : 22} />
          ) : (
            <div className="flex text-text text-sm items-center gap-2 h-6">
              Send <SendIcon></SendIcon>
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default InputPrompt;
