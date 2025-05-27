import Application from '../models/Application.js';
import Interview from '../models/Interview.js';
import User from '../models/User.js';

export const getPlacementMetrics = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const totalInterviews = await Interview.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const placedStudents = await User.countDocuments({ role: 'student', isPlaced: true });

    const placementRate = (placedStudents / totalStudents) * 100;

    res.json({
      totalApplications,
      totalInterviews,
      placedStudents,
      totalStudents,
      placementRate: placementRate.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch placement metrics' });
  }
};

