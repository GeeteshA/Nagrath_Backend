// Routes for handling admin profile operations.
const express = require('express');
const { getAdminProfile, updateAdminProfile } = require('../controllers/profileController');
const { protectAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/profile')
    .get(protectAdmin, getAdminProfile)
    .put(protectAdmin, updateAdminProfile);

module.exports = router;
