
import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    enum: ['virtual', 'in-person'],
    default: 'virtual',
  },
  interviewLink: {
    type: String,
  },
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
