const jwt = require('jsonwebtoken');

// Verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Verify if user is an instructor
const isInstructor = (req, res, next) => {
    if (req.user.role !== 'instructor') return res.status(403).json({ message: 'Access denied. Instructor only.' });
    next();
};

module.exports = { verifyToken, isInstructor };
