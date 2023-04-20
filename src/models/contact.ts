import mongoose from "mongoose"
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "" || undefined
  },
  participants: {
    // An array of userIds
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    required: true,
  },
  messages: {
    // An array of messageIds
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      }
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("Contacts", contactSchema)