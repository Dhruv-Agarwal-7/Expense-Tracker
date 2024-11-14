import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense', 'transfer'],
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: function() {
      return this.type !== 'transfer';
    }
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  recurrence: {
    type: String,
    enum: ['never', 'oneD', 'twoD', 'workD', 'oneW', 'twoW', 'fourW', 'oneM', 'twoM', 'threeM', 'sixM', 'oneY'],
    default: 'never',
  },
  end: {
    type: Date,
  },
  remind: {
    type: Date,
  },
  photo: {
    type: String,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transferTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.type === 'transfer';
    },
    default:null
  },
  transferFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.type === 'transfer';
    },
    default:null
  }
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);