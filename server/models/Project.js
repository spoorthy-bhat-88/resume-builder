import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: String,
  duration: String,
  highlights: [String],
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
