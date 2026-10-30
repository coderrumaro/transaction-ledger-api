import { Pool } from 'pg';
import { config } from '../config';

export const pool = new Pool({ connectionString: config.databaseUrl });

pool.on('error', (err) => {
  console.error('Unexpected database error on idle client', err.message);
});
