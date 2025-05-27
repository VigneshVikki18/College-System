import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
} from '../controllers/jobController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// ✅ Place this FIRST before any :id routes
router.get('/my-jobs', protect, roleMiddleware(['company']), getMyJobs);

// ✅ Other job routes
router.get('/', getAllJobs);
router.get('/:id', getJobById); // <-- This must come LAST
router.post('/', protect, roleMiddleware(['company']), createJob);
router.put('/:id', protect, roleMiddleware(['company']), updateJob);
router.delete('/:id', protect, roleMiddleware(['company']), deleteJob);

export default router;
