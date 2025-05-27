import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  placementDrive: { type: mongoose.Schema.Types.ObjectId, ref: 'PlacementDrive' },
  totalParticipants: Number,
  interviewsConducted: Number,
  offersMade: Number,
  successRate: Number,
  insights: String,
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
