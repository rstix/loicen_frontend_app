'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, ComponentType } from 'react';

const withAuth = (WrappedComponent: ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { data: session, status } = useSession();

    useEffect(() => {
      console.log(status);
      if (status === 'unauthenticated') {
        signIn('credentials');
      }
    }, [status]);

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (!session) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
