'use client';
import Chat from '@/components/chat';
import { useState, useEffect } from 'react';

const ServerLoading = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const startPod = async () => {
      try {
        await fetch(`${apiUrl}/chat/start-any`);
        isServerRunning();
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    startPod();
  });

  const isServerRunning = async () => {
    try {
      const response = await fetch(`${apiUrl}/chat/running`);
      if (response.ok) {
        console.log('Running');
        setLoading(false);
        // break;
      } else {
        console.error('Not Running');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex  justify-center items-center text-lg">
          Sit tight the server is loading
        </div>
      ) : (
        <Chat></Chat>
      )}
    </>
  );
};

export default ServerLoading;
