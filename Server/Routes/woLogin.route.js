import express from "express";
import { postContact } from "../Controllers/woLoginController.js";

const router = express.Router();

router.post('/contact_us', postContact);

export default router;