import AuthProvider from '@/components/auth-provider';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Chat from '@/components/chat';
import { getSessionUser } from '@/utils/get-session-user';

const ChatPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/chat');
    // redirect('/signin?callbackUrl=/');
  }

  const sessionUser = await getSessionUser();
  // console.log(sessionUser);

  return (
    <AuthProvider>
      <div
        className="flex h-screen flex-col items-center justify-between"
        suppressHydrationWarning
      >
        {/* <ServerLoading></ServerLoading> */}
        <Chat></Chat>
      </div>
    </AuthProvider>
  );
};

export default ChatPage;
