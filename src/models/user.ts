import { Types } from "mongoose"
import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  contacts: [{
    
    // An array of contact IDs
    type: Types.ObjectId,
    ref: "Contacts",
    required: true,

  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("Users", userSchema)