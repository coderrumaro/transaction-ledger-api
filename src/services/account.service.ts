import { pool } from '../db/pool';
import { accountNotFound } from '../errors';

export interface Account {
  id: string;
  name: string;
  balance: number;
  created_at: string;
}

const toAccount = (row: any): Account => ({
  id: row.id,
  name: row.name,
  balance: Number(row.balance),
  created_at: row.created_at,
});

export async function createAccount(name: string): Promise<Account> {
  const { rows } = await pool.query(
    'INSERT INTO accounts (name) VALUES ($1) RETURNING id, name, balance, created_at',
    [name]
  );
  return toAccount(rows[0]);
}

export async function getBalance(id: string) {
  const { rows } = await pool.query('SELECT id, balance FROM accounts WHERE id = $1', [id]);
  if (rows.length === 0) {
    throw accountNotFound(id);
  }
  return { account_id: rows[0].id, balance: Number(rows[0].balance) };
}
