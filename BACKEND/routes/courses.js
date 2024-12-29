const express = require('express');
const Course = require('../models/Course');
const { verifyToken, isInstructor } = require('../middleware/auth');

const router = express.Router();

// Create a new course (Instructor only)
router.post('/', verifyToken, isInstructor, async (req, res) => {
    const { title, description, videoUrl, resources } = req.body;

    try {
        const course = new Course({
            title,
            description,
            videoUrl,
            resources,
            createdBy: req.user.userId, // Instructor ID from JWT
        });

        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create course', error: err.message });
    }
});

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('createdBy', 'name'); // Include instructor name
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
    }
});

// Get a single course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('createdBy', 'name');
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.json(course);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch course', error: err.message });
    }
});

// Update a course (Instructor only)
router.put('/:id', verifyToken, isInstructor, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.createdBy.toString() !== req.user.userId)
            return res.status(403).json({ message: 'You do not have permission to edit this course' });

        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCourse);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update course', error: err.message });
    }
});

// Delete a course (Instructor only)
router.delete('/:id', verifyToken, isInstructor, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.createdBy.toString() !== req.user.userId)
            return res.status(403).json({ message: 'You do not have permission to delete this course' });

        await course.remove();
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete course', error: err.message });
    }
});

module.exports = router;
