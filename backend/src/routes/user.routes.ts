import { Router } from 'express';

import { authenticateToken } from '../middleware/auth';
import { pool } from '../app';

const router = Router();

router.get('/users', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool!.query(`SELECT * FROM users`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: 'Database query error',
      message: err instanceof Error ? err.message : 'Unknow error',
    });
  }
});

router.get('/test', authenticateToken, (req, res) => {
  const user = req.user;
  return res.json({
    email: user?.email,
  });
});

export default router;
