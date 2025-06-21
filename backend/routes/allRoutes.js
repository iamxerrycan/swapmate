const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const itemRoutes = require("./itemRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");

// Prefix each route group
router.use("/auth", authRoutes);    
router.use("/items", itemRoutes); 
router.use("/admin", adminRoutes);
router.use("/user", userRoutes ) 

module.exports = router;
