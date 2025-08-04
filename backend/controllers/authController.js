const { registerUser, loginUser , forgetPasswordService , resetPasswordService  , updateUserService ,deleteUserService , getUserService} = require('../services/authService');

const register = async (req, res) => {
  try {
    console.log('Incoming Register Body: ', req.body);
    const { name, email, password, isAdmin } = req.body;

    const result = await registerUser({
      name,
      email,
      password,
      isAdmin,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};


exports.logout = (req, res) => {
  res.json({ message: "User logged out" });
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { name, email, password } = req.body;
    const updatedUser = await updateUserService(userId, { name, email, password });
    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.getProfile = async (req, res) => { 
  try {
    const userId = req.user._id; // from auth middleware
    const user = await getUserService(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const user = await deleteUserService(userId);
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
 }

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await forgetPasswordService(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
} 

exports.resetPassword = async (req, res) => {
  
  try {
    const {token} = req.params
    const {  password } = req.body;
    const result = await resetPasswordService(token, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}



module.exports = { register, login };
