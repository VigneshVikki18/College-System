import express from 'express';
import {
  getRecruitmentStatus,
  getRecruitmentTrends
} from '../controllers/recruitmentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/status', protect, getRecruitmentStatus);
router.get('/trends', protect, getRecruitmentTrends);

export default router;
