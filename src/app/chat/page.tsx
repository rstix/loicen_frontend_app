import AuthProvider from '../context/auth-provider';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Chat from '@/components/chat';

const ChatPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/chat');
    // redirect('/signin?callbackUrl=/');
  }

  return (
    <AuthProvider session={session}>
      <div className="flex h-screen flex-col items-center justify-between">
        {/* <ServerLoading></ServerLoading> */}
        <Chat></Chat>
      </div>
    </AuthProvider>
  );
};

export default ChatPage;
