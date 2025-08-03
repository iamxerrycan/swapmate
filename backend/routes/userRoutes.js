const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  updateUserProfileController,
  forgotPasswordController,
  resetPasswordController,
  deleteUserProfileController
} = require('../controllers/userController');

// PUT /api/users/me - update profile
router.put('/profile', protect, updateUserProfileController);

router.get('/test', (req, res) => {
  res.json({ message: '✅ User route working' });
});

//delete user profile
router.delete('/profile', protect  ,deleteUserProfileController)

router.post('/forgot-password', forgotPasswordController);

// PUT /api/user/reset-password/:token
router.put('/reset-password/:token', resetPasswordController);

module.exports = router;


