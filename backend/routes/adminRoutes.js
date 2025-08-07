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



// | Method | Route                        | Description         | Body Required | Example Body (if any) |
// | ------ | ---------------------------- | ------------------- | ------------- | --------------------- |
// | GET    | `/api/admin/users`           | Get all users       | ❌             | –                     |
// | PUT    | `/api/admin/block/:id`       | Block a user        | ❌             | –                     |
// | PUT    | `/api/admin/unblock/:id`     | Unblock a user      | ❌             | –                     |
// | DELETE | `/api/admin/delete/:id`      | Delete a user       | ❌             | –                     |
// | GET    | `/api/admin/items`           | Get all items       | ❌             | –                     |
// | DELETE | `/api/admin/item/:id`        | Delete an item      | ❌             | –                     |
// | PUT    | `/api/admin/user/:id`        | Update user role    | ✅             | `{ "role": "admin" }` |
// | GET    | `/api/admin/dashboard/stats` | Get dashboard stats | ❌             | –                     |
