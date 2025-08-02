const { registerUser, loginUser } = require('../services/authService');

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

module.exports = { register, login };
