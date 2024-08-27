import ServerLoading from '@/components/server-loading';
import AuthProvider from './context/auth-provider';
import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Chat from '@/components/chat';

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
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
}
