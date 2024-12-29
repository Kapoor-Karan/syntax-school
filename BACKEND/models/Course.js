const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true }, // YouTube video link
    resources: { type: [String], default: [] }, // Array of text resource links
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Instructor ID
});

module.exports = mongoose.model('Course', CourseSchema);
