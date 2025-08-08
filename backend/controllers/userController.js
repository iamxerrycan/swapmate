const {
  getMeService,
  updateProfileService,
  deleteAccountService,
  getAllUsersService,
  getUserByIdService,
} = require('../services/userService');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const SwapRequest = require('../models/swapModel');
const mongoose = require('mongoose');

exports.getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, password } = req.body;
    console.log('Updating profile for user:', userId);
    console.log('Request body:', req.body);
    console.log('name email password', name, email, password);

    const updatedUser = await updateProfileService(userId, {
      name,
      email,
      password, // If you hash password, handle it inside the service
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: 'User not found or update failed' });
    }

    res.status(200).json({
      message: 'User profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const deletedUser = await deleteAccountService(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// controllers/userController.js

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [
      listed,
      swapped,
      pending,
      rejected,
      accepted,
      fulfilled,
      cancelled,
      // receivedPending,
    ] = await Promise.all([
      Item.countDocuments({ user: userId, isDeleted: false }),
      Item.countDocuments({
        user: userId,
        isSwapped: true,
        isDeleted: false,
      }),
      SwapRequest.countDocuments({ fromUser: userId, status: 'Pending' }),
      SwapRequest.countDocuments({ fromUser: userId, status: 'Rejected' }),
      SwapRequest.countDocuments({ fromUser: userId, status: 'Accepted' }),
      SwapRequest.countDocuments({ fromUser: userId, status: 'Completed' }),
      SwapRequest.countDocuments({ fromUser: userId, status: 'Cancelled' }),
      // SwapRequest.countDocuments({ toUser: userId, status: 'Pending' }),
    ]);

    res.json({
      listed,
      swapped,
      pending,
      rejected,
      accepted,
      fulfilled,
      cancelled,
      // received: { pending: receivedPending || 0 },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



//profile completion controller
exports.getProfileCompletion = async (req, res) => {
  try {
    const userId = req.user._id; 
    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalFields = 4; // ignoring password
    let filledFields = 0;

    if (user.name) filledFields++;
    if (user.email) filledFields++;
    if (user.profilePic) filledFields++;
    if (user.bio) filledFields++;

    const completion = Math.round((filledFields / totalFields) * 100);

    res.json({ completion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
