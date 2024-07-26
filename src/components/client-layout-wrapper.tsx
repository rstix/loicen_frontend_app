'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayoutWrapper: React.FC<ClientLayoutProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientLayoutWrapper;
