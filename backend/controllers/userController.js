const {
  getMeService,
  updateProfileService,
  deleteAccountService,
  getAllUsersService,
  getUserByIdService,
} = require('../services/userService');
const User = require('../models/userModel');

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

  // ✅ Step 3 Fix — Validate ObjectId
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
    const user = await User.findById(userId); // ✅ FIXED

    if (!user) {
      return res.status(404).json({ message: 'Failed to get user by ID' });
    }

    const listed = await Item.countDocuments({ user: userId });
    const swapped = await Item.countDocuments({
      user: userId,
      isSwapped: true,
    });
    const pending = await SwapRequest.countDocuments({
      fromUser: userId,
      status: 'Pending',
    });
    const rejected = await SwapRequest.countDocuments({
      fromUser: userId,
      status: 'Rejected',
    });
    const accepted = await SwapRequest.countDocuments({
      fromUser: userId,
      status: 'Accepted',
    });
    const fulfilled = await SwapRequest.countDocuments({
      fromUser: userId,
      status: 'Completed',
    });
    const cancelled = await SwapRequest.countDocuments({
      fromUser: userId,
      status: 'Cancelled',
    });

    res.json({
      listed,
      swapped,
      pending,
      rejected,
      accepted,
      fulfilled,
      cancelled,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

