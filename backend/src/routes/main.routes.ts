import { Router } from 'express';

import { pool } from '../app';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API Node.js on Raspberry PI 5',
    version: '1.0.0',
  });
});

router.get('/db-test', async (req, res) => {
  try {
    const [rows] = await pool!.query('SELECT NOW() as now, VERSION() as version');
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

router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timeStamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
