import path from 'path';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mysql, { Pool } from 'mysql2/promise';

const isDev = process.env.NODE_ENV === 'development';

const app = express();
app.use(
  cors({
    origin: isDev
      ? ['http://localhost:5173', 'http://localhost:3000'] // Dev
      : [`https://${process.env.DOMAIN}`, `https://www.${process.env.DOMAIN}`], // Prod
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

export const apiUrl: string = isDev ? 'http://localhost:3000' : 'https://api.sylvain-nas.ovh';

if (isDev) dotenv.config({ path: path.resolve(__dirname, './utils/.env') });

export const dbConfig = {
  host: isDev ? 'localhost' : process.env.DB_HOST || 'mariadb',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export default app;

export let pool: Pool | null = null;

export async function initDatabase(config: unknown) {
  const maxRetries = 30;
  const retryDelay = 3000;

  try {
    for (let i = 0; i < maxRetries; i++) {
      try {
        pool = mysql.createPool(dbConfig);
        await pool.query('SELECT 1');
        console.log('Connection to MariaDb succeed');
        return;
      } catch (error) {
        console.log(
          `Tentative ${i + 1}/${maxRetries} - MariaDB not ready yet, next try in ${retryDelay / 1000}s...`,
        );
        if (i === maxRetries - 1) {
          console.error('Impossible to connect to MariaDb after ', maxRetries, ' tentatives');
          console.error('Connection error to MariaDb: ', error);
        } else {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }
  } catch (error) {
    console.error('Connection error to MariaDb: ', error);
  }
}
