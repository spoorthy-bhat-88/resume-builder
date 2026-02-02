import express from 'express';
import Education from '../models/Education.js';

const router = express.Router();

// Get all education
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create education
router.post('/', async (req, res) => {
  const education = new Education(req.body);
  try {
    const newEducation = await education.save();
    res.status(201).json(newEducation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update education
router.put('/:id', async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEducation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete education
router.delete('/:id', async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
