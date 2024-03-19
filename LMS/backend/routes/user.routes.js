import {Router} from "express";
import { register,login,logout,getProfile, resetpassword, forgotpassword, changePassword } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const router=Router();


// router.route('/register').post(upload.single("avatar"),register)
router.post('/register',upload.single("avatar"),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn, getProfile);
router.post('/reset',forgotpassword);
router.post('/reset/:resetToken',resetpassword);
router.post('/change-password',isLoggedIn,changePassword);
router.put('/update/:id',isLoggedIn,upload.single("avatar"),updateUser);



export default router;