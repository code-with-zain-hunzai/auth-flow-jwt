import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(3,"Please more then 15 charactgers"),
});

export type FormValues = z.infer<typeof formSchema>;