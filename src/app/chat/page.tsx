'use client';

import Files from '@/components/files';
import Header from '@/components/header';
import InputPrompt from '@/components/input-prompt';
import StreamedText from '@/components/streamed-text';
import { Messages, Sources } from '@/interfaces/messages';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState<Messages[]>([
    //     { isUser: true, text: 'how to build a startup?', sources: [] },
    //     {
    //       isUser: false,
    //       text: `# How to Build a Startup
    // Building a startup can be an exciting but challenging journey. Here’s a comprehensive guide to help you navigate through the process:
    // ## 1. Ideation
    // ### Identify a Problem
    // - **Research**: Look for problems that need solving. Focus on areas you're passionate about or have expertise in.
    // - **Validate the Problem**: Talk to potential customers to ensure the problem is real and worth solving.
    // `,
    //       sources: [
    //         'AG Aachen_Fracke_RAG (+)',
    //         'BGH vom 13.12.2022 zu den Desinfektionskosten',
    //       ],
    //     },
    //     {
    //       isUser: true,
    //       text: 'Search for decisions where the tenant was provided with comparison offers by the liable insurer before renting by the obligated party. Please create a list with the following format',
    //       sources: [],
    //     },
    //     {
    //       isUser: false,
    //       text: `A paragraph with *emphasis* and **strong importance**.
    // > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
    // * Lists
    // * [ ] todo
    // * [x] done
    // A table:
    // | a | b |
    // | - | - |
    //  `,
    //       sources: [
    //         'AG Aachen_Fracke_RAG (+)',
    //         'AG Nürnberg, teilw obsiegt, Schwacke -17%, 3% EE, Desi (+)45 €,',
    //       ],
    //     },
  ]);
  const [sources, setSources] = useState<Sources[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // const router = useRouter();

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
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data);
      if (data.status == 'metadata') {
        // console.log(data.data.source_nodes);
        // const newSources: Sources[] = data.data.source_nodes
        setSources(data.data.source_nodes);
        setLoading(false);
      } else if (data.status == 'token') {
        setMessages((prev) =>
          prev.map((message, index) =>
            index === prev.length - 1
              ? { ...message, text: `${message.text} ${data.data}` }
              : message
          )
        );
        setLoading(false);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (input: string) => {
    if (socket && input) {
      const userMessage: Messages = {
        isUser: true,
        text: input,
        sources: [],
      };
      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);
      const storedUsername = localStorage.getItem('username');
      // console.log(storedUsername);

      socket.send(
        JSON.stringify({ prompt: input, user_id: storedUsername || 'test' })
      );
    }
  };

  return (
    <>
      <Header />
      <div
        className="w-full flex-1 overflow-scroll flex justify-center my-4 px-3"
        ref={chatContainerRef}
      >
        <div className="w-[650px]">
          <StreamedText messages={messages} />
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
        </div>
        <div>
          <Files sources={sources} />
        </div>
      </div>
      <InputPrompt onSend={sendMessage} />
    </>
  );
};

export default Chat;
