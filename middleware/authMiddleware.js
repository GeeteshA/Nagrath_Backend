// Middleware for verifying if the user is authenticated and has proper roles.
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if (req.user && req.user.role === 'admin') {
                return next();
            } else {
                return res.status(403).json({ message: 'Not authorized as an admin' });
            }
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const protectSuperAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);

            if (req.user && req.user.role === 'super-admin') {
                return next();
            } else {
                return res.status(403).json({ message: 'Not authorized as super admin' });
            }
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protectAdmin, protectSuperAdmin };
// module.exports = { protectAdmin, protectSuperAdmin };
