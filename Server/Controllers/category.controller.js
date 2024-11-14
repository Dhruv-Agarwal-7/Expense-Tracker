import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { Category } from "../Models/category.model.js";

export const addCategory = catchAsyncError(async (req, res) => {
    const { categoryName, categoryType } = req.body;
    const userId = req.user.id;
    if(!categoryName || !categoryType){
        return next(new ErrorHandler("Please fill full registration form"));
    }
    const newCategory = await Category.create({
        categoryName, categoryType, createdBy:userId
    });
    res.status(200).json({
        success: true,
        message: "New Category Added",
        newCategory
    });
});

export const getCategories = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const adminId = process.env.ADMIN_ID;

    const categories = await Category.find({
        createdBy: userId
    });
    res.status(200).json(categories);
});

export const updateCategory = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { categoryName, categoryType } = req.body;
    const category = await Category.findById(id);
    if (!category) {
        return next(new ErrorHandler("Category not found"));
    }
    const userId = req.user.id;
    if(category.createdBy.toString() !== userId){
        return next(new ErrorHandler("You are not authorized to update this category"));
    }
    category.categoryName = categoryName;
    category.categoryType = categoryType;
    await category.save();
    res.status(200).json({
        message: 'Category updated successfully',
        category 
    });
});

export const deleteCategory = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        return next(new ErrorHandler("Category not found"));
    }
    const userId = req.user.id;
    if(category.createdBy.toString() !== userId){
        return next(new ErrorHandler("You are not authorized to update this category"));
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({ 
        message: 'Category deleted successfully' 
    });
});
