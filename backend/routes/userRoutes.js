const express = require('express');
const router = express.Router();
const { adminOnly } = require('../middleware/authMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
  getMe,
  updateProfile,
  deleteAccount,
  getAllUsers,
  getProfileCompletion,
  getUserStats,
  getUserById,
} = require('../controllers/userController');


router.get('/stats', protect, getUserStats);

router.get('/profile-completion', protect, getProfileCompletion);
router.get('/me', protect, getMe); // Get logged-in user info
router.put('/me', protect, updateProfile); // Update profile
router.delete('/me', protect, deleteAccount); // Delete own account

router.get('/', protect,adminOnly, getAllUsers); // Admin only
router.get('/:id', protect, getUserById); // User/Admin

module.exports = router;






// | Method | Route            | Access     | Description           | Body Required | Example Body (if any)                              |
// | ------ | ---------------- | ---------- | --------------------- | ------------- | -------------------------------------------------- |
// | GET    | `/api/users/me`  | Protected  | Get current user info | ❌             | –                                                  |
// | PUT    | `/api/users/me`  | Protected  | Update current user   | ✅             | `{ "name": "New Name", "email": "test@mail.com" }` |
// | DELETE | `/api/users/me`  | Protected  | Delete own account    | ❌             | –                                                  |
// | GET    | `/api/users`     | Admin Only | Get all users         | ❌             | –                                                  |
// | GET    | `/api/users/:id` | Protected  | Get user by ID        | ❌             | –                                                  |

