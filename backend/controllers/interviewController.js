import Interview from '../models/Interview.js';
import Application from '../models/Application.js';

import { createGoogleMeetLink } from '../utils/googleMeet.js';



export const scheduleInterview = async (req, res) => {
  try {
    const { applicationId, date, timeSlot, format } = req.body;

    const application = await Application.findById(applicationId)
      .populate('job')        // get the job
      .populate('student');   // get the student

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const job = application.job;

    if (!job) {
      return res.status(404).json({ message: 'Associated job not found' });
    }

    const interviewLink =
      format === 'virtual'
        ? `https://meet.google.com/${Math.random().toString(36).substring(2, 7)}`
        : '';

    const interviewDate = new Date(date);

    const newInterview = new Interview({
      application: application._id,
      student: application.student._id,
      job: job._id,
      companyId: job.postedBy,
      date: interviewDate,
      timeSlot,
      format,
      interviewLink,
    });

    await newInterview.save();

    res.status(201).json({ message: 'Interview scheduled', interviewLink });
  } catch (error) {
    console.error('Interview schedule error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





// Get all interviews for the logged-in student
export const getStudentInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ studentId: req.user._id })
      .populate('job', 'title location')
      .populate('companyId', 'name email');

    res.json(interviews);
  } catch (error) {
    console.error('Error fetching student interviews:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all interviews for the logged-in company
export const getCompanyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ companyId: req.user._id })
      .populate('job', 'title location')
      .populate('studentId', 'fullName email');

    res.json(interviews);
  } catch (error) {
    console.error('Error fetching company interviews:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's interviews (either student or company)
export const getMyInterviews = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role; // assuming you have a `role` field in User

    let interviews;

    if (userRole === 'student') {
      interviews = await Interview.find({ studentId: userId })
        .populate('job', 'title location')
        .populate('companyId', 'name email');
    } else if (userRole === 'company') {
      interviews = await Interview.find({ companyId: userId })
        .populate('job', 'title location')
        .populate('studentId', 'fullName email');
    } else {
      return res.status(400).json({ message: 'Invalid user role' });
    }

    res.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Failed to fetch interview schedule' });
  }
};
