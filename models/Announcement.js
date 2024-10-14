// models / Announcement.js
const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // Add timestamps option

module.exports = mongoose.model('Announcement', announcementSchema);
