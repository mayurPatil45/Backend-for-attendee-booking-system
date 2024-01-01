const express = require('express');
const router = express.Router();
const { getFreeSessions, bookSession, getPendingSessions, addSessions } = require('../controllers/session-controller');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/add', authenticateToken, addSessions);
router.get('/free', authenticateToken, getFreeSessions);
router.post('/book', authenticateToken, bookSession);
router.get('/pending', authenticateToken, getPendingSessions);

module.exports = router;
