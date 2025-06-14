const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = async ({name , email ,password , isAdmin}) =>{
  const userExsits = await User.findOne({ email });
  if (userExsits) {
    throw new Error('User already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password , salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: isAdmin || false,
  });

  const token = generateToken(newUser._id);
  return { newUser, token };
}

const loginUser = async ({email , password} ) =>{
  const user =  await User.findOne({email});

  if(!user){
    throw new Error('Invalid email or password');
  }
  const ispasswordMatch = await bcrypt.compare(password , user.password);
  if(!ispasswordMatch){
    throw new Error('Invalid email or password');
  }
  const token = generateToken(user._id);
  return { user , token };
}

module.exports = {
  registerUser,
  loginUser,
};


