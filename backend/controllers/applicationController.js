import Application from '../models/Application.js';
import Job from '../models/Job.js';

export const createApplication = async (req, res) => {
  try {
    const { fullName, email, coverLetter, job } = req.body;
    const resumePath = req.file ? req.file.path : null;

    if (!resumePath) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    const newApplication = new Application({
      fullName,
      email,
      coverLetter,
      job,
      resume: uploads,
    });

    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (err) {
    console.error('❌ Backend error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).populate('jobId');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await Application.find({ student: userId }).populate('job');
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching applications' });
  }
};


export const applyToJob = async (req, res) => {
  try {
    const { fullName, email, coverLetter, job } = req.body;
    const resumePath = req.file?.path;

    // Validate all fields
    if (!resumePath || !fullName || !email || !job) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const application = new Application({
      resume: resumePath,
      fullName,
      email,
      coverLetter,
      job,                          // Must be a valid ObjectId (string)
      student: req.user._id,        // protect middleware must attach req.user
    });

    await application.save();
    res.status(201).json(application);
  } catch (err) {
    console.error("❌ Application error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};







export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('student', 'name email')
      .populate('job', 'title company');

    res.json(applications);
  } catch (error) {
    console.error('Error fetching all applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate('student', 'name email')
      .populate('job', 'title');

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications by job:', error);
    res.status(500).json({ message: 'Failed to fetch applications for this job' });
  }
};