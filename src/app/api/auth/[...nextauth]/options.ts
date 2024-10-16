import User from '@/models/User';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { isPasswordValid } from '@/utils/hash';
import connectDB from '@/config/database';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Geben Sie Ihren Email ein',
        },
        password: {
          label: 'Passwort',
          type: 'password',
          placeholder: 'Geben Sie Ihr Passwort ein',
        },
      },
      async authorize(credentials: any) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          return null;
        }

        const isPasswordMatch = await isPasswordValid(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  // callbacks: {
  //   async session({ session }) {
  //     const user = await User.findOne({ email: session.user?.email });
  //     session.user = user;
  //     return session;
  //   },
  // },
  session: {
    strategy: 'jwt',
  },
};
