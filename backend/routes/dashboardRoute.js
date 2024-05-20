const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route - Dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;