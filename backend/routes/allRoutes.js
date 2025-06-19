const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const itemRoutes = require("./itemRoutes");
const adminRoutes = require("./adminRoutes");

// Prefix each route group
router.use("/auth", authRoutes);       // /api/auth/...
router.use("/items", itemRoutes); 
router.use("/admin", adminRoutes); // /api/admin/...

module.exports = router;
