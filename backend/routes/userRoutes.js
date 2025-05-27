import express from 'express';
import { getProfile, updateProfile, listUsers } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/', protect, authorizeRoles('admin'), listUsers); // Only admin can view all users

export default router;
