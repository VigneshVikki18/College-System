import express from 'express';
import {
  scheduleInterview,
  getStudentInterviews,
  getCompanyInterviews,
  getMyInterviews
} from '../controllers/interviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/my', protect, getMyInterviews);
router.get('/student/:studentId', getStudentInterviews);
router.get('/student', protect, getStudentInterviews);
router.get('/company', protect, getCompanyInterviews);

// ✅ Use the actual controller here
router.post('/schedule', protect, scheduleInterview);


export default router;
