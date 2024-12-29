const express = require('express');
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const { verifyToken, isInstructor } = require('../middleware/auth');

const router = express.Router();

// Add a new quiz to a course (Instructor only)
router.post('/', verifyToken, isInstructor, async (req, res) => {
    const { courseId, questions } = req.body;

    try {
        // Ensure the course exists and belongs to the instructor
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.createdBy.toString() !== req.user.userId)
            return res.status(403).json({ message: 'You do not have permission to add quizzes to this course' });

        const quiz = new Quiz({ courseId, questions });
        await quiz.save();
        res.status(201).json(quiz);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create quiz', error: err.message });
    }
});

// Get all quizzes for a course
router.get('/:courseId', verifyToken, async (req, res) => {
    try {
        const quizzes = await Quiz.find({ courseId: req.params.courseId });
        if (quizzes.length === 0) return res.status(404).json({ message: 'No quizzes found for this course' });

        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch quizzes', error: err.message });
    }
});

// Get a specific quiz by ID
router.get('/quiz/:id', verifyToken, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch quiz', error: err.message });
    }
});

// Update a quiz (Instructor only)
router.put('/:id', verifyToken, isInstructor, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        // Ensure the quiz belongs to a course owned by the instructor
        const course = await Course.findById(quiz.courseId);
        if (!course || course.createdBy.toString() !== req.user.userId)
            return res.status(403).json({ message: 'You do not have permission to edit this quiz' });

        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedQuiz);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update quiz', error: err.message });
    }
});

// Delete a quiz (Instructor only)
router.delete('/:id', verifyToken, isInstructor, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        // Ensure the quiz belongs to a course owned by the instructor
        const course = await Course.findById(quiz.courseId);
        if (!course || course.createdBy.toString() !== req.user.userId)
            return res.status(403).json({ message: 'You do not have permission to delete this quiz' });

        await quiz.remove();
        res.json({ message: 'Quiz deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete quiz', error: err.message });
    }
});

module.exports = router;
