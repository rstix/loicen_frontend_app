import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Benutzername',
          type: 'text',
          placeholder: 'Geben Sie Ihren Benutzernamen ein',
        },
        password: {
          label: 'Passwort',
          type: 'password',
          placeholder: 'Geben Sie Ihr Passwort ein',
        },
      },
      async authorize(credentials) {
        const user = {
          id: '42',
          username: process.env.NEXT_AUTH_USERNAME,
          password: process.env.NEXT_AUTH_PASSWORD,
        };
        if (
          credentials?.username == user.username &&
          credentials?.password == user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
