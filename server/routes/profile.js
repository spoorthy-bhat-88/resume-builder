import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Get user profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Merge profile data with user email
    const profileData = {
      ...user.profile.toObject(),
      email: user.email
    };
    
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/', authenticateToken, async (req, res) => {
  try {
    const { name, phone, city, state } = req.body;
    
    // Update user profile in database
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        $set: { 
          'profile.name': name,
          'profile.phone': phone,
          'profile.city': city,
          'profile.state': state
        }
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Merge profile data with user email
    const profileData = {
      ...user.profile.toObject(),
      email: user.email
    };

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
