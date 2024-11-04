// Controller for managing super admin and admins
const Admin = require('../models/adminModel');
const generateToken = require('../config/generateToken');

// Super Admin - Create Admin
const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({
        name,
        email,
        password,
        role: 'admin', // Default role for new admin
    });

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            token: generateToken(admin._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid admin data' });
    }
};

// Update Admin
const updateAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.id);

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

// Delete Admin
const deleteAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.id);

    if (admin) {
        await admin.remove();
        res.json({ message: 'Admin removed' });
    } else {
        res.status(404).json({ message: 'Admin not found' });
    }
};

// Get All Admins (For Super Admin)
const getAllAdmins = async (req, res) => {
    const admins = await Admin.find({ role: 'admin' });
    res.json(admins);
};

module.exports = {
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAllAdmins,
};
