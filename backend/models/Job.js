import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    skillsRequired: {
      type: [String],
      default: []
    },
    salary: {
      type: Number,
      required: false
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
