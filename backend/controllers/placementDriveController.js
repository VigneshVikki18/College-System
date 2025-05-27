import PlacementDrive from '../models/PlacementDrive.js';

export const createDrive = async (req, res) => {
  const { name, date, companies } = req.body;
  try {
    const drive = await PlacementDrive.create({ name, date, companies });
    res.status(201).json(drive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const drive = await PlacementDrive.findById(req.params.id);
    if (!drive.registeredStudents.includes(req.user.id)) {
      drive.registeredStudents.push(req.user.id);
      await drive.save();
    }
    res.json(drive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDrives = async (req, res) => {
  try {
    const drives = await PlacementDrive.find().populate('companies registeredStudents');
    res.json(drives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDriveReport = async (req, res) => {
  try {
    const drive = await PlacementDrive.findById(req.params.id)
      .populate('companies registeredStudents interviews');

    const report = {
      name: drive.name,
      date: drive.date,
      totalStudents: drive.registeredStudents.length,
      totalCompanies: drive.companies.length,
      totalInterviews: drive.interviews.length,
      offersMade: drive.offersMade
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
