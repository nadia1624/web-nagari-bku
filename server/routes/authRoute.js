const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authToken');
const { login, changePassword} = require('../controllers/authControllers');

router.post('/login', login);

router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: "Access granted to protected route", user: req.user });
});

router.put('/change-password', authenticateToken, changePassword); 

module.exports = router;
