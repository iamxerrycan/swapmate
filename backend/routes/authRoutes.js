const {
  register,
  login,
  logout,
  updateProfile,
  getProfile,
  deleteAccount,
  forgetPassword,
  resetPassword,
} = require('../controllers/authController');

const router = require('express').Router();

const { protect } = require('../middleware/authMiddleware');

// Already existing:
router.post('/register', register);
router.post('/login', login);

// New ones to add:
router.post('/logout', protect, logout); // Optional: blacklist token or delete client-side
router.put('/update', protect, updateProfile);
router.get('/profile', protect, getProfile);
router.delete('/delete', protect, deleteAccount);

router.post('/forget', forgetPassword);
router.post('/reset/:token', resetPassword);

module.exports = router;

