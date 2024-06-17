'use client';
import { Messages } from '@/interfaces/messages';
import { useEffect, useState } from 'react';

const WebSocketChat = () => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [input, setInput] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    console.log(123);
    const ws = new WebSocket('ws://localhost:8000/api/chat/');
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const serverMessage: Messages = {
        isUser: false,
        text: event.data,
        sources: [],
      };
      setMessages((prev) => [...prev, serverMessage]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input) {
      const userMessage: Messages = {
        isUser: true,
        text: input,
        sources: [],
      };
      setMessages((prev) => [...prev, userMessage]);

      socket.send(JSON.stringify({ prompt: input }));
      setInput('');
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} style={{ color: msg.isUser ? 'blue' : 'black' }}>
              {msg.text}
              {msg.sources.length > 0 && (
                <ul>
                  {msg.sources.map((source, i) => (
                    <li key={i}>{source}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketChat;
