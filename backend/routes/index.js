const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
// const itemRoutes = require("./itemRoutes");

// Prefix each route group
router.use("/auth", authRoutes);       // /api/auth/...
// router.use("/items", itemRoutes);      // /api/items/...

module.exports = router;
