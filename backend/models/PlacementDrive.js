import mongoose from 'mongoose';

const placementDriveSchema = new mongoose.Schema({
  title: String,
  date: Date,
  location: String,
  participatingCompanies: [String],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  interviewsConducted: Number,
  offersMade: Number,
});

export default mongoose.model('PlacementDrive', placementDriveSchema);
