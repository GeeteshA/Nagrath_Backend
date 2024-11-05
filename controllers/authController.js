const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

// @desc    Create the Super Admin (Only for initialization)
// @route   POST /api/auth/createSuperAdmin
// @access  Public
const createSuperAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a super admin already exists
        const superAdminExists = await User.findOne({ role: 'super-admin' });
        if (superAdminExists) {
            return res.status(400).json({ message: 'Super Admin already exists' });
        }

        // Create a new super admin
        const superAdmin = await User.create({
            name,
            email,
            password,
            role: 'super-admin',
        });

        res.status(201).json({
            _id: superAdmin._id,
            name: superAdmin.name,
            email: superAdmin.email,
            role: superAdmin.role,
            token: generateToken(superAdmin._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Super Admin', error: error.message });
    }
};

// @desc    Create an Admin (Only Super Admin can create Admins)
// @route   POST /api/auth/createAdmin
// @access  Private (Super Admin only)
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the admin already exists
        const adminExists = await User.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create a new admin
        const admin = await User.create({
            name,
            email,
            password,
            role: 'admin',
        });

        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            token: generateToken(admin._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Admin', error: error.message });
    }
};

// @desc    Admin login (Both Super Admin and Admin can login)
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      console.log("User found:", user); // Verify if the user exists
  
      if (user && (await user.matchPassword(password))) {
        console.log("Password matched"); // Password comparison succeeded
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        console.log("Invalid email or password"); // Incorrect credentials
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error("Error during login:", error); // Log any unexpected error
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };
  
  

// @desc    Get all admins (Super Admin only)
// @route   GET /api/auth/admins
// @access  Private (Super Admin only)
const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' });
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins', error: error.message });
    }
};

// @desc    Delete an admin (Super Admin only)
// @route   DELETE /api/auth/admin/:id
// @access  Private (Super Admin only)
const deleteAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        await admin.remove();
        res.json({ message: 'Admin removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error: error.message });
    }
};

module.exports = {
    createSuperAdmin,
    createAdmin,
    loginAdmin,
    getAdmins,
    deleteAdmin,
};
