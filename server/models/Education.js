import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  field: String,
  startDate: String,
  endDate: String,
  gpa: String,
  achievements: [String],
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);
