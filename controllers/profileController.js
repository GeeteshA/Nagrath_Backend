// Handles fetching and updating admin profile.
const Admin = require('../models/adminModel');

// Get Profile
const getAdminProfile = async (req, res) => {
    const admin = await Admin.findById(req.user._id);

    if (admin) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
        });
    } else {
        res.status(404).json({ message: 'Admin not found' });
    }
};

// Update Profile
const updateAdminProfile = async (req, res) => {
    const admin = await Admin.findById(req.user._id);

    if (admin) {
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;

        if (req.body.password) {
            admin.password = req.body.password;
        }

        const updatedAdmin = await admin.save();

        res.json({
            _id: updatedAdmin._id,
            name: updatedAdmin.name,
            email: updatedAdmin.email,
            role: updatedAdmin.role,
        });
    } else {
        res.status(404).json({ message: 'Admin not found' });
    }
};

module.exports = { getAdminProfile, updateAdminProfile };
