// Defines routes for managing patients (admins only).
const express = require('express');
const { 
    createPatient, 
    getPatients, 
    getPatientById, 
    updatePatient, 
    deletePatient, 
    SearchPatient, 
    getPatientQRCode,
    getPublicPatientById
} = require('../controllers/patientController');
const { protectAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Route for creating a new patient with multiple file uploads and retrieving all patients
router.route('/')
    .post(protectAdmin, createPatient)    // Create a patient with files (Admin protected)
    .get(protectAdmin, getPatients);      // Get all patients (Admin protected)

// Route for searching patients based on specific criteria (name, city, etc.)
router.get('/search', protectAdmin, SearchPatient);

// Routes for actions on a specific patient by ID, including multiple file upload for updates
router.route('/:id')
    .get(protectAdmin, getPatientById)    // Get patient details by ID (Admin protected)
    .put(protectAdmin, updatePatient)     // Update patient with files by ID (Admin protected)
    .delete(protectAdmin, deletePatient); // Delete patient by ID (Admin protected)

// Route for retrieving a specific patient's QR code by ID
router.get('/:id/qrcode', protectAdmin, getPatientQRCode); // Get QR code (Admin protected)
// Public route to get patient details by ID
router.get('/public/:id', getPublicPatientById);

module.exports = router;
 
