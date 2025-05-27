import express from 'express';
import { getPlacementMetrics } from '../controllers/reportController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
//router.get('/placement-metrics', protect, getPlacementMetrics);
router.get('/placement-metrics', getPlacementMetrics);
export default router;
