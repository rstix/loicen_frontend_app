import Chat from '@/components/chat';
import AuthProvider from './context/auth-provider';
import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=http://49.12.194.134/');
  }
  console.log(session);
  return (
    <AuthProvider>
      <div className="flex h-screen flex-col items-center justify-between">
        <Chat></Chat>
      </div>
    </AuthProvider>
  );
}
