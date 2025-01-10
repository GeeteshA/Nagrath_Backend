const Patient = require('../models/patientModel');
const multer = require('multer');
const QRCode = require('qrcode');

// Configure multer to handle file uploads with a size limit
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit photo size to 5MB
});

// Allow multiple files, including one photo and multiple documents
const multiUpload = upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'documentFile', maxCount: 10 } // Allow up to 10 document files
]);


// Get all Patients for the logged-in admin
const createPatient = async (req, res) => {
  try {
    // Destructure basic patient information from req.body
    const {
      name, age, mobile, addressLine1, address, pincode, district, country,
      gender, dateOfBirth, aadharNumber, city, state, hemoglobin, bloodGroup,
      bloodPressure, heartRate, calcium, fastingBloodSugar,
      bloodCbc, urineTest, lipidProfile, tshTest,
      // Medivcal history and other
      medicalHistory
    } = req.body;

    // Handle single photo file
    const photo = req.files && req.files['photo'] && req.files['photo'][0] ? {
      data: req.files['photo'][0].buffer,
      contentType: req.files['photo'][0].mimetype
    } : null;

    // Handle multiple document files, if uploaded
    const documentFiles = req.files && req.files['documentFile']
      ? req.files['documentFile'].map(doc => ({
        data: doc.buffer,
        contentType: doc.mimetype
      }))
      : []; // Default to empty array if no documents are uploaded

    // Create and save a new patient instance
    let newPatient = new Patient({
      admin: req.user._id,
      name, age, mobile, addressLine1, address, pincode, district, country,
      gender, dateOfBirth, aadharNumber, city, state, photo, hemoglobin,
      bloodGroup, bloodPressure, heartRate, fastingBloodSugar, calcium,
      bloodCbc, urineTest, lipidProfile, tshTest,
      //Medical and other
      medicalHistory, documentFile: documentFiles
    });

    await newPatient.save(); // Save to generate _id

    // Generate QR code for patient URL
    const qrData = `${process.env.CLIENT_ORIGIN || 'https://nagrath-frontend.vercel.app'}/patients/${newPatient._id}`;
    try {
      const qrCode = await QRCode.toDataURL(qrData);
      newPatient.qrCode = qrCode;
    } catch (qrError) {
      console.error('QR Code generation failed:', qrError);
      return res.status(500).json({ message: 'QR code generation failed' });
    }

    await newPatient.save(); // Save again with QR code
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient with QR code:', error);
    res.status(400).json({ message: 'Invalid patient data', error: error.message });
  }
};


const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patients', error: error.message });
  }
};

// `getPatientById` to format both photo and document files as base64
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Convert patient to plain object for easier manipulation
    let patientData = patient.toObject();

    // Format photo as a base64 string if available
    if (patient.photo && patient.photo.data) {
      patientData.photo = `data:${patient.photo.contentType};base64,${patient.photo.data.toString('base64')}`;
    }

    // Check if documentFile is an array before mapping
    if (Array.isArray(patient.documentFile)) {
      patientData.documentFile = patient.documentFile.map(file => {
        if (file.data && file.contentType) {
          return {
            data: `data:${file.contentType};base64,${file.data.toString('base64')}`,
            contentType: file.contentType
          };
        }
        return null; // Return null if `data` or `contentType` is missing
      }).filter(Boolean); // Remove any null entries
    } else if (patient.documentFile && patient.documentFile.data) {
      // Handle single document file (if documentFile is not an array)
      patientData.documentFile = [{
        data: `data:${patient.documentFile.contentType};base64,${patient.documentFile.data.toString('base64')}`,
        contentType: patient.documentFile.contentType
      }];
    } else {
      // If no document files, set an empty array
      patientData.documentFile = [];
    }

    res.json(patientData);
  } catch (error) {
    console.error('Error retrieving patient:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Update fields from req.body, skipping undefined values
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        patient[key] = req.body[key];
      }
    });

    // Handle uploaded photo if present
    if (req.files && req.files['photo'] && req.files['photo'][0]) {
      patient.photo = {
        data: req.files['photo'][0].buffer,
        contentType: req.files['photo'][0].mimetype
      };
    }

    // Handle multiple document files if uploaded
    if (req.files && req.files['documentFile']) {
      patient.documentFile = req.files['documentFile'].map(doc => ({
        data: doc.buffer,
        contentType: doc.mimetype
      }));
    }

    // Update the QR code with the new patient URL if necessary
    const qrData = `${process.env.FRONTEND_URL}/admin/patients/${patient._id}`;
    patient.qrCode = await QRCode.toDataURL(qrData);

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(400).json({ message: 'Error updating patient', error: error.message });
  }
};


// Delete Patient
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (patient) {
      await patient.remove();
      res.json({ message: 'Patient removed' });
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
};

// Search Patient
const SearchPatient = async (req, res) => {
  const { name, city, district, state, country } = req.query;
  const filters = {};

  if (name) filters.name = { $regex: name, $options: 'i' };
  if (city) filters.city = { $regex: city, $options: 'i' };
  if (district) filters.district = { $regex: district, $options: 'i' };
  if (state) filters.state = { $regex: state, $options: 'i' };
  if (country) filters.country = { $regex: country, $options: 'i' };

  try {
    const patients = await Patient.find(filters);
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// Fetch Patient Photo
const getPatientPhoto = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient || !patient.photo) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.set('Content-Type', patient.photo.contentType);
    res.send(patient.photo.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image' });
  }
};
const getPatientQRCode = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Define the public patient URL to encode in the QR code
    const publicUrl = `${process.env.FRONTEND_URL || 'https://nagrath-frontend.vercel.app'}/public-patient/${patientId}`;

    // Generate the QR code with the public URL
    const qrCodeDataUrl = await QRCode.toDataURL(publicUrl);

    res.status(200).json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ message: 'Error generating QR code', error: error.message });
  }
};


// Public controller to get limited patient data
// Ensure all fields are included in the response
const getPublicPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select('-documentFile -qrCode');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient details', error });
  }
};



// Updated `multiUpload` for file handling in createPatient and updatePatient
module.exports = {
  createPatient: [multiUpload, createPatient],
  getPatients,
  getPatientById,
  updatePatient: [multiUpload, updatePatient],
  deletePatient,
  SearchPatient,
  getPatientPhoto,
  getPublicPatientById,
  getPatientQRCode // New export for QR code endpoint
};
