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





// | Method | Route                    | Access    | Description               | Body Required | Example Body (if any)                                               |
// | ------ | ------------------------ | --------- | ------------------------- | ------------- | ------------------------------------------------------------------- |
// | POST   | `/api/auth/register`     | Public    | Register new user         | ✅             | `{ "name": "Raj", "email": "test@mail.com", "password": "123456" }` |
// | POST   | `/api/auth/login`        | Public    | Login                     | ✅             | `{ "email": "test@mail.com", "password": "123456" }`                |
// | POST   | `/api/auth/logout`       | Protected | Logout                    | ❌             | –                                                                   |
// | PUT    | `/api/auth/update`       | Protected | Update profile            | ✅             | `{ "name": "New Name", "email": "new@mail.com" }`                   |
// | GET    | `/api/auth/profile`      | Protected | Get profile               | ❌             | –                                                                   |
// | DELETE | `/api/auth/delete`       | Protected | Delete account            | ❌             | –                                                                   |
// | POST   | `/api/auth/forget`       | Public    | Send reset email          | ✅             | `{ "email": "test@mail.com" }`                                      |
// | POST   | `/api/auth/reset/:token` | Public    | Reset password with token | ✅             | `{ "password": "newpassword123" }`                                  |
