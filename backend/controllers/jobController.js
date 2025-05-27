import Job from '../models/Job.js';

// ✅ Get jobs posted by current company
export const getMyJobs = async (req, res) => {
  try {
    console.log("🧪 USER ID:", req.user?._id);  // This should print the current company user's ID

    const jobs = await Job.find({ postedBy: req.user._id }).populate('applications');
    res.json(jobs);
  } catch (error) {
    console.error("❌ getMyJobs error:", error); // This will show the real error
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// ✅ Get all jobs (public)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');

    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// ✅ Create a new job (company only)
export const createJob = async (req, res) => {
  try {
    console.log('➡️ Job creation request by user:', req.user);

    const { title, description, location, skillsRequired, salary } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const job = new Job({
      title,
      description,
      location,
      skillsRequired,
      salary,
      postedBy: req.user._id
    });

    const saved = await job.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Error in createJob:', error.stack);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};



// ✅ Update job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { title, description, location, skillsRequired, salary } = req.body;
    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.skillsRequired = skillsRequired || job.skillsRequired;
    job.salary = salary || job.salary;

    const updated = await job.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await job.deleteOne();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};