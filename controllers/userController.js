
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
};


const registerUser = asyncHandler(async ( req, res) => {
    const { name , email, password } = req.body

    // Validation
    if( !name || !email || !password) {
      res.status(400)
      throw new Error("Please fill in all required fields")
    }
    if (password.length < 6) {
      res.status(400)
      throw new Error("Password must be up to 6 characters")
    }
    // Check if user email already exist
    const userExist = await User.findOne({ email })
    if(userExist) {
      res.status(400)
      throw new Error("Email is already been registered")
    }

    // Create a new user in DB
    const user = new User({
      name,
      email,
      password
    });
    await user.save()

    // Encrypt Password before saving to DB

    // Generate Token
    const token = generateToken(user._id)
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000*86400),
      sameSite: "none",
      secure: true,
    })

    if(user) {
      const { _id, name, email } = user
      res.status(201).json({ _id, name, email, token })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
});

const loginUser = asyncHandler(async ( req, res) => {
  const { email, password } = req.body

  // Validation
  if( !email || !password) {
    res.status(400);
    throw new Error("Please add email and password")
  }
  // check if user exist
  const user = await User.findOne({ email })
  if( !user ) {
    res.status(400)
    throw new Error("User not found, please sign-up.")
  }
  // if user exist, check password
  const passwordIsCorrect = await bcrypt.compare(password, user.password)

  //Generate Token
  const token = generateToken(user._id)

  // Send HTTP-only Cookie
  if(passwordIsCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    })
  }

  if(user && passwordIsCorrect) {
    const { _id, name, email } = user
    res.status(200).json({
      _id,
      name,
      email,
      token,
    })
  } else {
    res.status(400);
    throw new Error("Invalid email and password")
  }


});

export {
    registerUser, loginUser,
}
