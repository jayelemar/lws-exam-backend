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
  categories: {
    type: [String],  // Array of strings
    required: true,
    enum: ['action', 'comedy', 'drama', 'fantasy', 'romance', 'school life', 'supernatural'],
  },
},
{
  timestamps: true,
})

export default mongoose.model("Animes", animeSchema)