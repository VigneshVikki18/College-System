import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'company', 'admin'], default: 'student' },
  academicDetails: {
    degree: String,
    branch: String,
    yearOfPassing: Number,
    cgpa: Number,
  },
  companyDetails: {
    companyName: String,
    description: String,
    website: String,
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
