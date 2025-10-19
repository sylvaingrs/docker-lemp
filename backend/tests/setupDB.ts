import { execSync } from 'child_process';

export default async () => {
  console.log('🔄 Resetting test database...');
  execSync('npm run db:import:test', { stdio: 'inherit' });
};
