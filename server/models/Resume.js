import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  jobPosting: String,
  projects: [{
    title: String,
    description: String,
    technologies: String,
    duration: String,
    highlights: [String],
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    gpa: String,
    achievements: [String],
  }],
  experiences: [{
    company: String,
    position: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String,
    achievements: [String],
  }],
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
