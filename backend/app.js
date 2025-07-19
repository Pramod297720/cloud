// Backend/app.js
import express from 'express';
import cors from 'cors';
import { pool } from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import helpRoutes from './routes/helpRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- Health-check ---------- */
app.get('/api/ping', async (_req, res) => {
    try {
        const [rows] = await pool.query('SELECT NOW() AS now');
        res.json({ status: 'ok', dbTime: rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'DB not reachable' });
    }
});

/* ---------- Auth routes ---------- */

app.use('/api/auth', authRoutes);
app.use('/api/help', helpRoutes);
app.use('/api/admin', adminRoutes);


/* ---------- 404 fallback ---------- */
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));



export default app;
