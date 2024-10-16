'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { hashPassword } from '@/utils/hash';

export const register = async (values: any) => {
  const { email, password, phrase } = values;
  const secretPhrase = process.env.NEXT_AUTH_PHRASE;
  if (phrase !== secretPhrase) {
    // throw new Error('Phrases is wrong!');
    // console.log('Phrases is wrong!');
    // return;
    return {
      error: 'Phrase is wrong!',
    };
  }
  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: 'Email already exists!',
      };
    }
    const hashedPassword = await hashPassword(password);

    const user = new User({
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
  } catch (e) {
    console.log(e);
  }
};
