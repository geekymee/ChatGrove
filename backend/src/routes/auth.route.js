import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { userDetails } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

//protected routes
router.post('/moreinfo', protectRoute, userDetails);
//to check if the user is logged in and get user details
router.get('/me', protectRoute, (req, res)=>{
    res.status(200).json({ success: true, user: req.user });
});
export default router;