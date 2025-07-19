import express from 'express';
import {
    createThread,      // POST /
    listMyThreads,     // GET /mine
    listAllThreads,    // GET /
    postMessage,       // POST /:id/messages
    getMessages        // GET  /:id/messages
} from '../controllers/threadController.js';
import { requireAuth, isAdmin } from '../middleware/authMiddleware.js';

const r = express.Router();

/* student */
r.post('/', requireAuth, createThread);
r.get('/mine', requireAuth, listMyThreads);

/* admin */
r.get('/', requireAuth, isAdmin, listAllThreads);

/* both participants */
r.post('/:id/messages', requireAuth, postMessage);
r.get('/:id/messages', requireAuth, getMessages);

export default r;
