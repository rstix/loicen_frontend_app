'use client';
import Chat from '@/components/chat';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const ServerLoading = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const isMockup = process.env.NEXT_PUBLIC_API_WEBSOCKET_MOCKUP;
  const [loading, setLoading] = useState<boolean>(
    isMockup == 'true' ? false : true
  );
  const [ip, setIp] = useState<string>('');
  const [publicPort, setpuPlicPort] = useState<string>('');
  const [activePod, setActivePod] = useState<string>('');

  const { data: session, status } = useSession();
  console.log(session?.user);

  useEffect(() => {
    const startPod = async () => {
      try {
        const response = await fetch(`${apiUrl}/chat/start-any`);
        // console.log(response);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            if (data && data.ip && data.public_port) {
              isServerRunning(data);
              setIp(data.ip);
              setpuPlicPort(data.public_port);
              setActivePod(data.active_pod_id);
            }
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

    if (isMockup != 'true') startPod();
  });

  const isServerRunning = async (data: any) => {
    try {
      const response = await fetch(
        `${apiUrl}/chat/running/${data.ip}/${data.public_port}/${data.active_pod_id}`
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
          Warten Sie, der Server wird geladen...
        </div>
      ) : (
        <Chat ip={ip} publicPort={publicPort} activePod={activePod}></Chat>
      )}
    </>
  );
};

export default ServerLoading;
