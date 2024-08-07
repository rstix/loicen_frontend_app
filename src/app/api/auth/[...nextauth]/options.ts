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
          useranme: process.env.NEXT_AUTH_USERNAME,
          password: process.env.NEXT_AUTH_PASSWORD,
        };
        if (
          credentials?.username == user.useranme &&
          credentials?.password == user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
