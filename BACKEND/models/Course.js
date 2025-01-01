const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Instructor ID
  videoUrl: { type: String, default: null }, // URL for course video
  resources: [{ type: String }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of student IDs
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
