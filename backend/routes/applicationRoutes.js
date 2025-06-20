import express from 'express';
import multer from 'multer';
import { protect } from '../middlewares/authMiddleware.js';
import {
  applyToJob,
  getMyApplications,
  getAllApplications,
  getApplicationsByJob
} from '../controllers/applicationController.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.get('/my', protect, getMyApplications);
router.get('/', protect, getAllApplications);
router.get('/job/:jobId', protect, getApplicationsByJob);

// Only one POST route, protected and with resume upload
router.post('/', protect, upload.single('resume'), applyToJob);
router.patch('/applications/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Application.findByIdAndUpdate(id, { status });
  res.sendStatus(200);
});
router.patch('/applications/:id/schedule', async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  await Application.findByIdAndUpdate(id, {
    status: 'Interview Scheduled',
    interviewDate: date,
    interviewTime: time,
  });
  res.sendStatus(200);
});



export default router;
