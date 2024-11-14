import express from "express";
import { addCategory, getCategories, updateCategory, deleteCategory } from "../Controllers/category.controller.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

router.post('/addCategory', isAuthenticated, addCategory);
router.get('/getCategory', isAuthenticated, getCategories);
router.put('/updateCategory/:id', isAuthenticated, updateCategory);
router.delete('/deleteCategory/:id', isAuthenticated, deleteCategory);

export default router;
