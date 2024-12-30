const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    completedLessons: { type: [String], default: [] }, // Array of completed lesson IDs or names
    quizResults: [
        {
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
            score: { type: Number, default: 0 },
        },
    ],
});

module.exports = mongoose.model('Progress', ProgressSchema);
