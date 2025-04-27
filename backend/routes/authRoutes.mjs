import express from 'express';
import { protect } from '../middleware/auth.mjs';
import { authUser, registerUser, getUserProfile } from '../controllers/authController.mjs';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/me', protect, getUserProfile);

export default router;