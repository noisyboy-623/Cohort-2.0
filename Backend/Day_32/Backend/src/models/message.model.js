import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Message must belong to a chat']
    },
    content: {
      type: String,
      required: [true, 'Please provide message content'],
      trim: true,
      minlength: [1, 'Message cannot be empty'],
      maxlength: [5000, 'Message cannot exceed 5000 characters']
    },
    role: {
      type: String,
      enum: ['user', 'ai'],
      required: [true, 'Please specify the message role'],
      default: 'user'
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// Index for faster queries
messageSchema.index({ chat: 1, createdAt: 1 });

export const messageModel = mongoose.model('Message', messageSchema);
