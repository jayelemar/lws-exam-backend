import mongoose from "mongoose"

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
}, {
timestamps: true,
})

const User = mongoose.model("User", userSchema)

export default User

