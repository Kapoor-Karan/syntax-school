const jwt = require('jsonwebtoken');

// Verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token data (e.g., userId, role) to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Verify if user is an instructor
const isInstructor = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Access denied. No token provided.' });
    if (req.user.role !== 'instructor') {
        return res.status(403).json({ message: 'Access denied. Instructor only.' });
    }
    next();
};

// Dynamic Role Verification
const checkRole = (role) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: 'Access denied. No token provided.' });
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Access denied. ${role} only.` });
        }
        next();
    };
};

module.exports = { verifyToken, isInstructor, checkRole };
