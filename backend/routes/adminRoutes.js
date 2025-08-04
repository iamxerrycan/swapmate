const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getAllItems,
  deleteUser,
  deleteItem,
  updateUserRole,
  blockUser,
  unblockUser,
  getAdminStats
} = require('../controllers/adminController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// 🔐 All routes below are protected and admin-only
router.use(protect, adminOnly);

router.get("/users", getAllUsers);          // View all users
router.put("/block/:id", blockUser);        //  Block user
router.put("/unblock/:id", unblockUser);    //  Unblock user
router.delete("/delete/:id", deleteUser);   //  Delete user
router.get("/items", getAllItems);          //  View all items
router.delete("/item/:id", deleteItem);     //  Delete item
router.put("/user/:id", updateUserRole);    //  Update user role
router.get("/dashboard/stats", getAdminStats); // For dashboard metrics


module.exports = router;
