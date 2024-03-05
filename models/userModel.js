import mongoose from "mongoose"
import bycrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    required: [true, "Pls add a name"] 
  },
  email: {
    type: String,
    required: [true, "Pls add an email"], 
    unique: true,
    trim: true,
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Pls add a password"],
    minLength:[6, "Password must be up to 6 characters"],
  },
  likedAnimes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
    }
  ]
}, {
timestamps: true,
})

// Encrypt Password before saving to DB
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) {
    return next()
  }

  // Hash Password
  const salt = await bycrypt.genSalt(10)
  const hashPassword = await bycrypt.hash(this.password, salt)
  this.password = hashPassword
  next()
})

const User = mongoose.model("User", userSchema)

export default User

