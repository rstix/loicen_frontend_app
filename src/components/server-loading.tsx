'use client';
import Chat from '@/components/chat';
import { useState, useEffect } from 'react';

const ServerLoading = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState<boolean>(true);
  const [ip, setIp] = useState<string>('');
  const [publicPort, setpuPlicPort] = useState<string>('');

  useEffect(() => {
    const startPod = async () => {
      try {
        const response = await fetch(`${apiUrl}/chat/start-any/${0}`);
        if (response.ok) {
          response.json().then((data) => {
            isServerRunning(data);
            setIp(data.ip);
            setpuPlicPort(data.public_port);
          });
          // isServerRunning();
          // console.log('Running');
          // setLoading(false);
          // break;
        } else {
          console.error('Not Running');
        }

        // setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    startPod();
  });

  const isServerRunning = async (data: any) => {
    try {
      const response = await fetch(
        `${apiUrl}/chat/running/${data.ip}/${data.public_port}`
      );
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
        <Chat ip={ip} publicPort={publicPort}></Chat>
      )}
    </>
  );
};

export default ServerLoading;
