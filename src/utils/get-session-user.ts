import { getServerSession } from 'next-auth/next';
import { options } from '../app/api/auth/[...nextauth]/options';

export const getSessionUser = async () => {
  const session = await getServerSession(options);

  if (!session || !session.user) return null;

  return { user: session.user.email };
};
