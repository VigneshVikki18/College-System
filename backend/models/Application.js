import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or 'Student' if you have a separate model
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // stores filename (uploaded via multer)
    required: true,
  },
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'interviewed', 'accepted', 'rejected'],
    default: 'submitted',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Application', applicationSchema);
