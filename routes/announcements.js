const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement'); // Adjust the path as necessary

// @route GET /api/announcementss
// @desc Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /api/announcements
// @desc Create a new announcement
router.post('/', async (req, res) => {
  const announcement = new Announcement({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newAnnouncement = await announcement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE /api/announcements/:id
// @desc Delete an announcement
router.delete('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

    await announcement.remove();
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
