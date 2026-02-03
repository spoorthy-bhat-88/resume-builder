import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: String,
  startDate: String,
  endDate: String,
  description: String,
  achievements: [String],
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
