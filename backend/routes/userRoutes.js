const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  updateUserProfileController,
  forgotPasswordController,
  resetPasswordController,
} = require('../controllers/userController');

// PUT /api/users/me - update profile
router.put('/profile', protect, updateUserProfileController);

router.get('/test', (req, res) => {
  res.json({ message: '✅ User route working' });
});


router.post('/forgot-password', forgotPasswordController);

// PUT /api/user/reset-password/:token
router.put('/reset-password/:token', resetPasswordController);

module.exports = router;


