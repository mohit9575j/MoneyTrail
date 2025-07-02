import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  isPaid: {
    type: Boolean,
    default: false // Free by default
  },

  // paymentInfo: {
  //   orderId: { type: String },
  //   paymentId: { type: String },
  //   amount: { type: Number },
  //   status: {
  //     type: String,
  //     enum: ['success', 'failed', 'pending'],
  //     default: 'pending'
  //   },
  //   paidAt: { type: Date }
  // }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
