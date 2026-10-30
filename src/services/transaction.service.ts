import { PoolClient } from 'pg';
import { pool } from '../db/pool';
import { accountNotFound, duplicateTransaction, insufficientBalance } from '../errors';
import { CreateTransactionInput } from '../validators/transaction.validator';

export interface Transaction {
  id: string;
  account_id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string | null;
  reference_id: string;
  created_at: string;
}

const toTransaction = (row: any): Transaction => ({
  id: row.id,
  account_id: row.account_id,
  type: row.type,
  amount: Number(row.amount),
  description: row.description,
  reference_id: row.reference_id,
  created_at: row.created_at,
});

export async function applyTransaction(
  client: PoolClient,
  accountId: string,
  input: CreateTransactionInput
): Promise<Transaction> {
  const account = await client.query('SELECT id FROM accounts WHERE id = $1 FOR UPDATE', [
    accountId,
  ]);
  if (account.rowCount === 0) {
    throw accountNotFound(accountId);
  }

  const existing = await client.query(
    'SELECT * FROM transactions WHERE account_id = $1 AND reference_id = $2',
    [accountId, input.reference_id]
  );
  if (existing.rowCount) {
    throw duplicateTransaction(toTransaction(existing.rows[0]));
  }

  const sign = input.type === 'credit' ? '+' : '-';
  const updated = await client.query(
    `UPDATE accounts SET balance = balance ${sign} $1
     WHERE id = $2 AND balance ${sign} $1 >= 0`,
    [input.amount, accountId]
  );
  if (updated.rowCount === 0) {
    throw insufficientBalance();
  }

  const inserted = await client.query(
    `INSERT INTO transactions (account_id, type, amount, description, reference_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [accountId, input.type, input.amount, input.description ?? null, input.reference_id]
  );
  return toTransaction(inserted.rows[0]);
}

export async function createTransaction(
  accountId: string,
  input: CreateTransactionInput
): Promise<Transaction> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const transaction = await applyTransaction(client, accountId, input);
    await client.query('COMMIT');
    return transaction;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
