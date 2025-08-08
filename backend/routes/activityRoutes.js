const express = require('express');
const router = express.Router();
const Activity = require('../models/ActivityModel');

// GET all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name') // Optional: show user name
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error });
  }
});

module.exports = router;
