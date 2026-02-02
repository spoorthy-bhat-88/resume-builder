import express from 'express';
import Resume from '../models/Resume.js';

const router = express.Router();

// Get all resumes
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create resume
router.post('/', async (req, res) => {
  const resume = new Resume(req.body);
  try {
    const newResume = await resume.save();
    res.status(201).json(newResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update resume
router.put('/:id', async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete resume
router.delete('/:id', async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
