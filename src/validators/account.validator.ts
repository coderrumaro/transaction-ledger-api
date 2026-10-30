import { z } from 'zod';

export const createAccountSchema = z
  .object({
    name: z.string({ error: 'name is required' }).trim().min(1, 'name is required'),
  })
  .strict();
