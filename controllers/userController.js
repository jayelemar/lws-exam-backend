
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

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
    const newUser = new User({
      name,
      email,
      password
    });
    await newUser.save()

    // Encrypt Password before saving to DB

});

export {
    registerUser,
}
