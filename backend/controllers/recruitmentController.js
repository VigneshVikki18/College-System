import User from '../models/User.js';
import Application from '../models/Application.js';
import PlacementDrive from '../models/PlacementDrive.js';

// ✅ 1. Overall Recruitment Status
export const getRecruitmentStatus = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const studentsPlaced = await Application.countDocuments({ status: 'placed' });
    const applications = await Application.countDocuments();
    const offersMade = studentsPlaced;

    const successRate =
      totalStudents > 0 ? ((studentsPlaced / totalStudents) * 100).toFixed(1) : 0;

    res.json({
      totalStudents,
      studentsPlaced,
      applications,
      offersMade,
      successRate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 2. Drive-wise Trends
export const getRecruitmentTrends = async (req, res) => {
  try {
    const drives = await PlacementDrive.find().populate('registeredStudents interviews');

    const trends = drives.map(drive => ({
      drive: drive.name,
      students: drive.registeredStudents.length,
      placed: drive.offersMade || 0
    }));

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
