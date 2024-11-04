const express = require('express');
const router = express.Router();
const { createSuperAdmin, createAdmin, loginAdmin, getAdmins, deleteAdmin } = require('../controllers/authController');
const { protectSuperAdmin, protectAdmin } = require('../middleware/authMiddleware');

// Super Admin routes
router.post('/createSuperAdmin', createSuperAdmin);        // Create the super admin (should be called once)
router.post('/createAdmin', protectSuperAdmin, createAdmin);   // Super Admin can create Admins
router.get('/admins', protectSuperAdmin, getAdmins);        // Super Admin can list all admins
router.delete('/admin/:id', protectSuperAdmin, deleteAdmin); // Super Admin can delete an admin

// Admin routes
router.post('/login', loginAdmin);                        // Login route for both Super Admin and Admins

module.exports = router;
