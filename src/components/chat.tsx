'use client';

import FilesProvider from '@/components/files-sidebar/files-provider';
// import Header from '@/components/header';
import InputPrompt from '@/components/input-prompt';
import StreamedText from '@/components/chat/streamed-text';
import { Messages, Sources } from '@/interfaces/messages';
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InitPrompts from './init-prompts';
// import OpenButton from './feedback-mode/open-button';

const Chat = () => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [lastId, setLastId] = useState<string>('');
  const [sources, setSources] = useState<Sources[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [promptIndex, setPromptIndex] = useState<number>(0);
  const [canAsk, setCanAsk] = useState<boolean>(false);

  const initPrompts = [
    'What are the typical legal outcomes and cost apportionments in German civil cases involving car rental and accident-related claims, based on the rulings from the Aachen, Altena, and Bautzen district courts?',
    'What legal requirements must be met for a car leasing contract to be considered valid under German law, and how do these requirements protect both the lessee and lessor?',
    'How do German laws regulate the end-of-lease process for car leasing, including the assessment of vehicle condition, mileage limits, and any applicable fees for excess wear and tear?',
  ];

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   router.push('/login');
    //   return;
    // }
    // const startServer = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8000/api/server/start', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ id: 'pdhhuyfybqepxm' }),
    //     });

    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }

    //     const data = await response.json();
    //     console.log('Server started:', data);
    //   } catch (error) {
    //     console.error('Error starting server:', error);
    //   }
    // };

    // startServer();

    const ws = new WebSocket('ws://localhost:8000/api/chat/');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setCanAsk(true);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      setCanAsk(false);
      const data = JSON.parse(event.data);
      // console.log(data);
      if (data.status == 'metadata') {
        console.log(data);
        const newSources = data.data.source_nodes.map((source: Sources) => ({
          ...source,
          id: data.id,
        }));
        setSources((prevSources) => [...prevSources, ...newSources]);
        // setSources((prevSources) => [
        //   ...prevSources,
        //   ...data.data.source_nodes,
        // ]);
      } else if (data.status == 'token') {
        setLastId(data.id);
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.status === 'token') {
            return prev.map((message, index) =>
              index === prev.length - 1
                ? { ...message, text: `${message.text}${data.data}` }
                : message
            );
          } else {
            const newMessage = {
              id: data.id,
              text: data.data,
              status: data.status,
              dislike: false,
            };
            return [...prev, newMessage];
          }
        });
        setLoading(false);
      } else if (data.status == 'end_of_stream') {
        setCanAsk(true);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      setCanAsk(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const scrollDown = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current?.scrollHeight;
    }
  };

  useEffect(() => {
    scrollDown();
  }, [messages]);

  const sendMessage = (input: string) => {
    if (socket && input) {
      const userMessage: Messages = {
        id: uuidv4(),
        text: input,
        status: 'user',
      };
      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);
      setPromptIndex(promptIndex + 1);
      const storedUsername = localStorage.getItem('username');
      socket.send(
        JSON.stringify({
          prompt: input,
          prompt_id: promptIndex,
          user_id: storedUsername || 'test',
        })
      );
    }
  };

  const handleDislike = (id: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, dislike: !message.dislike } : message
      )
    );
  };

  const fillInput = (text: string, index: number) => {
    setPromptIndex(index);
    setInput(text);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="flex w-full relative">
        {/* <div className="absolute top-2 left-2">
          <OpenButton />
        </div> */}
        <div className="flex flex-1 flex-col items-center max-h-screen">
          <div className="w-full flex-1 overflow-hidden flex">
            <div
              className="overflow-scroll flex justify-center w-full my-4 px-3 "
              ref={chatContainerRef}
            >
              <div className="w-[650px]">
                {messages.length ? (
                  <>
                    <StreamedText
                      messages={messages}
                      onDislike={handleDislike}
                      sources={sources}
                    />
                    {loading && (
                      <div className="flex justify-center my-4">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 text-gray animate-spin dark:text-gray fill-gray-light dark:fill-gray-light"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col h-full gap-2 justify-center  items-center">
                    <InitPrompts fillInput={fillInput} prompts={initPrompts} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-[650px]">
            <InputPrompt
              onSend={sendMessage}
              placeholder="Type your question..."
              border={true}
              message={input}
              small={false}
              canAsk={canAsk}
            />
          </div>
        </div>
        <div className="w-[480px] bg-gray-very_dark px-4 py-6 lg:p-6 min-h-screen max-h-screen overflow-y-scroll">
          <FilesProvider sources={sources} lastId={lastId} />
        </div>
      </div>
    </>
  );
};

export default Chat;
