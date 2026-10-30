import { z } from 'zod';

export const accountIdSchema = z.string().uuid('Invalid account id');

export const createTransactionSchema = z
  .object({
    type: z.enum(['credit', 'debit'], { error: 'type must be either credit or debit' }),
    amount: z
      .number({ error: 'amount must be a number' })
      .positive('amount must be greater than 0')
      .refine((v) => Math.round(v * 100) === v * 100, 'amount can have at most 2 decimal places'),
    description: z.string().trim().optional(),
    reference_id: z
      .string({ error: 'reference_id is required' })
      .trim()
      .min(1, 'reference_id is required'),
  })
  .strict();

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
