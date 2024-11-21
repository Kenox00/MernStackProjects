const jwt = require('jsonwebtoken')
const User = require("../models/userModel");


const createToken =  (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const SignUp = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password); // Correct method name
    const token = createToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const Login = async (req,res,next) =>{
    const { email , password } = req.body;
try {
    const user =await  User.login(email, password );
    const token = createToken(user._id);
    res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({ message: "User logged in successfully", success: true });
      next()
} catch (error) {
    res.status(400).json({error: error.message})
}
}

module.exports = { SignUp,Login };