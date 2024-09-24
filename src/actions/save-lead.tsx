'use server';

import connectDB from '@/config/database';
import Lead from '@/models/Lead';
import { revalidatePath } from 'next/cache';

const saveLead = async (formData: FormData) => {
  await connectDB();

  const email = formData.get('email');

  if (!email) {
    return { error: 'Email must be provided' };
  }

  const newEmail = new Lead({
    email,
  });
  console.log(newEmail);

  await newEmail.save();

  // revalidate cache
  // revalidatePath('/', 'page');

  return { submitted: 'Email submitted' };
};

export default saveLead;
