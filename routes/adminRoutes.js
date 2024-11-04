// Defines routes for managing admins (super admin only).
const express = require('express');
const { createAdmin, updateAdmin, deleteAdmin, getAllAdmins } = require('../controllers/adminController');
const { protectSuperAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .post(protectSuperAdmin, createAdmin)
    .get(protectSuperAdmin, getAllAdmins);

router.route('/:id')
    .put(protectSuperAdmin, updateAdmin)
    .delete(protectSuperAdmin, deleteAdmin);

module.exports = router;
