import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { profileSetup } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

//protected routes
router.post('/profilesetup', protectRoute, profileSetup);
//to check if the user is logged in and get user details
router.get('/me', protectRoute, (req, res)=>{
    res.status(200).json({ success: true, user: req.user });
});
export default router;