import mongoose from 'mongoose'

const animeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  name: {
    type: String,
    required:true,
  },
  desc: {
    type: String,
    required: true,
  },
  tittleImage: {
    type: String,
    // required: true,
  },
  categories: {
    type: [String],  // Array of strings
    required: true,
    enum: ['action', 'comedy', 'drama', 'fantasy', 'romance', 'school life', 'supernatural'],
  },
  rate: {
    type: Number,
    required: true,
    default: 0,
  }
},
{
  timestamps: true,
})

export default mongoose.model("Animes", animeSchema)