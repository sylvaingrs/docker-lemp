import { execSync } from 'child_process';

import { initDatabase, dbConfig, pool } from '../src/app';

export default async () => {
  console.log('🔄 Resetting test database...');
  execSync('npm run db:import:test', { stdio: 'inherit' });
};

beforeAll(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
  await initDatabase(dbConfig);
});

afterAll(async () => {
  await pool?.end();
});
