// src/app/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiHandler } from 'next';

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
          const user = { id: 1, name: 'Test User', email: 'test@example.com' };

          if (
            credentials.username === process.env.AUTH_USERNAME &&
            credentials.password === process.env.AUTH_PASSWORD
          ) {
            return user;
          }
          return null;
        },
      }),
    ],
    session: {
      jwt: true,
    },
    callbacks: {
      async jwt(token, user) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session(session, token) {
        session.user = token;
        return session;
      },
    },
    pages: {
      signIn: '/login',
    },
  });

export default authHandler;
