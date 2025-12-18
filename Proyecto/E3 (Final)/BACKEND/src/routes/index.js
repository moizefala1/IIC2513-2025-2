const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const usersRouter = require('./users');
const eventsRouter = require('./events');
const { authenticateToken } = require('../middlewares/auth');

router.use('/auth', authRouter);

// Users: si quieres dejarlo público, mantenlo así;
// si luego quieres protegerlo, cambia a:
// router.use('/users', authenticateToken, usersRouter);
router.use('/users', usersRouter);

router.use('/events', authenticateToken, eventsRouter);

router.get('/me', authenticateToken, (req, res) => {
  const { id, username, email, image, age, birthday } = req.user;
  res.json({ user: { id, username, email, image, age, birthday } });
});

module.exports = router;
