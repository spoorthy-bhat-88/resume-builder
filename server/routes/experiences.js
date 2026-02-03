import express from 'express';
import jwt from 'jsonwebtoken';
import Experience from '../models/Experience.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Get all experiences for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const experiences = await Experience.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create experience for authenticated user
router.post('/', authenticateToken, async (req, res) => {
  const experience = new Experience({
    ...req.body,
    userId: req.user.id
  });
  try {
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update experience (only if it belongs to user)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    if (experience.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this experience' });
    }
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete experience (only if it belongs to user)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    if (experience.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this experience' });
    }
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
