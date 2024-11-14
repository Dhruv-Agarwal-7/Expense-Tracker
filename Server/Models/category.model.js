import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  categoryType: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},{timestamps: true});

export const Category = mongoose.model('Category', categorySchema);