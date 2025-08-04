const {
  registerUser,
  loginUser,
  updateUserService,
  getUserService,
  deleteUserService,
  forgetPasswordService,
  resetPasswordService,
} = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const result = await registerUser({ name, email, password, isAdmin });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  // Client-side token deletion is enough unless you're using a token blacklist
  res.json({ message: 'User logged out successfully' });
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, password } = req.body;
    const updatedUser = await updateUserService(userId, { name, email, password });
    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await getUserService(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const user = await deleteUserService(req.user._id);
    res.status(200).json({ message: 'Account deleted', user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await forgetPasswordService(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const result = await resetPasswordService(token, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



