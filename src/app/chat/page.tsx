import AuthProvider from '@/components/auth-provider';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Chat from '@/components/chat';
import ThemeProviderWrapper from '@/components/theme-provider-wrapper';

const ChatPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/chat');
  }

  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <div className="flex h-screen flex-col items-center justify-between text-text border-border">
          <Chat></Chat>
        </div>
      </ThemeProviderWrapper>
    </AuthProvider>
  );
};

export default ChatPage;
