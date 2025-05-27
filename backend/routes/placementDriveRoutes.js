import express from 'express';
import {
  createDrive,
  getAllDrives,
  registerStudent,
  getDriveReport
} from '../controllers/placementDriveController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createDrive); // Admin
router.get('/', protect, getAllDrives);
router.post('/:id/register', protect, registerStudent);
router.get('/:id/report', protect, getDriveReport);

router.get('/report', getDriveReport);
export default router;
