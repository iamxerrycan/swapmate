const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


const registerUser = async ({ name, email, password, isAdmin }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: isAdmin || false,
  });

  const token = generateToken(newUser._id);
  return { newUser, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error('Invalid email or password');

  const token = generateToken(user._id);
  return { user, token };
};

// TOD Implement below services
const updateUserService = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  Object.assign(user, data);
  await user.save();
  return user;
};

const getUserService = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error('User not found');
  return user;
};


const resetPasswordService = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error('Token is invalid or has expired');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { message: 'Password has been reset successfully' };
};

const forgetPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email not registered');

  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save({ validateBeforeSave: false });

  // ⛔️ Mock email (you can plug in nodemailer/sendgrid later)
  return {
    message: 'Reset link sent (mock)',
    resetLink: `https://yourapp.com/reset/${rawToken}`, // send raw token, not hashed
  };
};

const logout = () => {
  
  return { message: 'User logged out successfully' };
};

module.exports = {
  registerUser,
  loginUser,
  updateUserService,
  getUserService,
  deleteUserService,
  forgetPasswordService,
  resetPasswordService,
  logout
};