'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { hashPassword } from '@/utils/hash';

export const register = async (values: any) => {
  const { email, password } = values;
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
