import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const dumpsDir = join(projectRoot, 'mariadb', 'dumps');
const sqlFile = join(dumpsDir, 'init.sql');

if (!existsSync(dumpsDir)) {
  mkdirSync(dumpsDir, { recursive: true });
}

console.log(sqlFile);