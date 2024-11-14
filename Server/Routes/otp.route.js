import express from "express";
import { getOtp } from "../Controllers/otp.controller.js";

const router = express.Router();

router.post('/getotp', getOtp);

export default router;