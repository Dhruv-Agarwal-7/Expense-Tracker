import express from "express";
import {Signup, Signin, Signout, google, protectedMode, updateProfile, updateAvatar} from "../Controllers/user.controller.js";
import { isAuthenticated } from "../Middlewares/auth.js";
import  upload  from "../Middlewares/upload.js";

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', Signin);
router.post('/google', google);
router.get('/signout', Signout);
router.get('/protectedRoute', isAuthenticated, protectedMode);
router.put('/updateavatar', isAuthenticated, upload.single('profilePhoto'), updateAvatar);
router.put('/updateprofile', isAuthenticated, updateProfile);

export default router;