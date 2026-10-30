import { pool } from '../db/pool';

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
