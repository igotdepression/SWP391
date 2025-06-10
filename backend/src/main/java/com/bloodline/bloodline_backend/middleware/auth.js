const jwt = require('jsonwebtoken');
const AppUser = require('../models/AppUser');
const Role = require('../models/Role');

exports.authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access token is required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await AppUser.findByPk(decoded.userId, {
            include: [{ model: Role, as: 'role' }]
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

exports.authorizeStaff = async (req, res, next) => {
    try {
        const allowedRoles = ['Staff', 'ADMIN'];
        if (!req.user || !req.user.role || !allowedRoles.includes(req.user.role.roleName)) {
            return res.status(403).json({ message: 'Access denied. Staff or Admin role required.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 