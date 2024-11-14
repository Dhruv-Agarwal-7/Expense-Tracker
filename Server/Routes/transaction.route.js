import express from 'express';
import { isAuthenticated } from "../Middlewares/auth.js"
import { addTransaction, editTransaction, deleteTransaction, getTransactions, getRecentTransactions, spendingCategories } from "../Controllers/transaction.controller.js"
import upload from '../Middlewares/upload.js';

const router = express.Router();

router.post('/addTransaction', isAuthenticated, upload.single('photo'), addTransaction);
router.get('/getTransaction', isAuthenticated, getTransactions);
router.get('/getRecentTransactions', isAuthenticated, getRecentTransactions);
router.get('/spendingCategories', isAuthenticated, spendingCategories);
router.put('/editTransaction/:id', isAuthenticated, upload.single('photo'), editTransaction);
router.delete('/deleteTransaction/:id', isAuthenticated, deleteTransaction);


export default router;
