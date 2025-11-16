import { readFileSync, writeFileSync } from 'fs';

const file = 'mariadb/dumps/init.sql';
let sql = readFileSync(file, 'utf8');

// remove DEFINER= lines safely
sql = sql.replace(/\/\*![0-9]+\s+DEFINER=`[^`]*`@`[^`]*`\s*/g, '/* ');

writeFileSync(file, sql, 'utf8');
console.log('✔ DEFINER statements removed');
