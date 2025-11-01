import path from 'path';

import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

import { comparePassword, hashPassword } from './utils/password';
import { generateToken } from './utils/jwt';
import { authenticateToken } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 3000;

const isDev = process.env.NODE_ENV === 'development';
const apiUrl: string = isDev ? 'http://localhost:3000' : 'https://api.sylvain-nas.ovh';

dotenv.config({ path: path.resolve(__dirname, './utils/.env') });

app.use(
  cors({
    origin: isDev
      ? ['http://localhost:5173', 'http://localhost:3000'] // Dev
      : [`https://${process.env.DOMAIN}`, `https://www.${process.env.DOMAIN}`], // Prod
    credentials: true,
  }),
);
app.use(express.json());

const dbConfig = {
  host: isDev ? 'localhost' : process.env.DB_HOST || 'mariadb',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let pool: mysql.Pool;

async function initDatabase() {
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

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    timeStamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API Node.js on Raspberry PI 5',
    version: '1.0.0',
    endpoints: [
      'GET /',
      'GET /health',
      'GET /status',
      'GET /hello/:name',
      'POST /test',
      'GET /db-test',
      'GET /users',
    ],
  });
});

app.get('/hello/:name', (req: Request, res: Response) => {
  const name = req.params;
  res.json({
    message: `Bonjour ${name}!`,
    timetamp: new Date().toISOString(),
  });
});

app.post('/test', (req: Request, res: Response) => {
  const data = req.body;
  res.json({
    message: 'Data received',
    received: data,
    timestamp: new Date().toISOString(),
  });
});

app.get('/status', authenticateToken, (req: Request, res: Response) => {
  res.json({
    status: 'running',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    platform: process.platform,
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
});

app.get('/db-test', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT NOW() as now, VERSION() as version');
    res.json({
      message: 'Database connection succeed',
      data: rows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Database connection error',
      message: error instanceof Error ? error.message : 'Unknow error',
    });
  }
});

app.get('/api/users', authenticateToken, async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM users`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: 'Database query error',
      message: err instanceof Error ? err.message : 'Unknow error',
    });
  }
});

type UserEmailHashPasswordRow = RowDataPacket & {
  id: number;
  email: string;
  hash_password: string;
};

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query<UserEmailHashPasswordRow[]>(
      `SELECT id, email, hash_password FROM users WHERE users.email = '${email}'`,
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = { id: rows[0].id, email: rows[0].email, hashPassword: rows[0].hash_password };

    if (!user) {
      return res.status(401).json({ error: 'Email incorrect' });
    }

    const isPasswordCorrect = await comparePassword(password, user.hashPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Password incorrect' });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    res.json({
      message: 'Login suceed',
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: `Database error: ${error}` });
  }
});

type UserEmail = RowDataPacket & { email: string };

app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const [rows] = await pool.query<UserEmail[]>(`SELECT email FROM users WHERE users.email = ?`, [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'user already registered' });
    }

    const hashedPassword = await hashPassword(password);

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO users (name, email, hash_password, created_at, updated_at) VALUES ('${name}', '${email}', '${hashedPassword}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    );

    const userId = result.insertId;

    const token = generateToken({ userId, email });

    return res.status(201).json({ message: 'Account successfully created', token });
  } catch (err) {
    console.log('error : ', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({
    authenticated: true,
    user: req.user,
  });
});

async function startServer() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Can access on: ${apiUrl}`);
  });
}

startServer();
