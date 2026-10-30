import { z } from 'zod';

export const accountIdSchema = z.string().uuid('Invalid account id');

export const createAccountSchema = z
  .object({
    name: z.string({ error: 'name is required' }).trim().min(1, 'name is required'),
  })
  .strict();
