import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Chat must belong to a user']
    },
    title: {
      type: String,
      required: [true, 'Please provide a chat title'],
      trim: true,
      maxlength: [200, 'Chat title cannot exceed 200 characters']
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// Index for faster queries
chatSchema.index({ user: 1, createdAt: -1 });

export const chatModel = mongoose.model('Chat', chatSchema);
