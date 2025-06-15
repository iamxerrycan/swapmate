const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');

// @route POST /api/auth/register
router.post('/register', register);

router.post('/test', (req, res) => {
  console.log("/test hit! req.body is:", req.body);
  res.json({ message: "Received", data: req.body });
});


// @route POST /api/auth/login
router.post('/login', login);

module.exports = router;
