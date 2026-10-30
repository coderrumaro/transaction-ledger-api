import { z } from 'zod';

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

export const listTransactionsSchema = z.object({
  type: z.enum(['credit', 'debit'], { error: 'type must be either credit or debit' }).optional(),
  page: z.coerce
    .number({ error: 'page must be a number' })
    .int('page must be an integer')
    .min(1, 'page must be at least 1')
    .default(1),
  limit: z.coerce
    .number({ error: 'limit must be a number' })
    .int('limit must be an integer')
    .min(1, 'limit must be at least 1')
    .max(100, 'limit cannot be more than 100')
    .default(10),
});

export type ListTransactionsQuery = z.infer<typeof listTransactionsSchema>;
