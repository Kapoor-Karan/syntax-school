const express = require('express');
const Progress = require('../models/Progress');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Fetch progress for a user in a specific course
router.get('/:courseId', verifyToken, async (req, res) => {
    try {
        const progress = await Progress.findOne({
            userId: req.user.userId,
            courseId: req.params.courseId,
        });

        if (!progress) return res.status(404).json({ message: 'Progress not found' });

        res.json(progress);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch progress', error: err.message });
    }
});

// Update completed lessons
router.put('/lessons/:courseId', verifyToken, async (req, res) => {
    const { lessonId } = req.body;

    try {
        let progress = await Progress.findOne({
            userId: req.user.userId,
            courseId: req.params.courseId,
        });

        if (!progress) {
            progress = new Progress({
                userId: req.user.userId,
                courseId: req.params.courseId,
            });
        }

        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
        }

        await progress.save();
        res.json(progress);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update progress', error: err.message });
    }
});

// Update quiz results
router.put('/quizzes/:courseId', verifyToken, async (req, res) => {
    const { quizId, score } = req.body;

    try {
        let progress = await Progress.findOne({
            userId: req.user.userId,
            courseId: req.params.courseId,
        });

        if (!progress) {
            progress = new Progress({
                userId: req.user.userId,
                courseId: req.params.courseId,
            });
        }

        const existingQuiz = progress.quizResults.find((quiz) => quiz.quizId.toString() === quizId);

        if (existingQuiz) {
            existingQuiz.score = Math.max(existingQuiz.score, score); // Update with the highest score
        } else {
            progress.quizResults.push({ quizId, score });
        }

        await progress.save();
        res.json(progress);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update quiz results', error: err.message });
    }
});

module.exports = router;
