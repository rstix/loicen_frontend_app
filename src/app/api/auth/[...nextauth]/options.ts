import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter your username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
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
  // pages: {
  //   signIn: '/signin', // Custom sign-in page
  // },
};
