// Schema for storing patient data.
const mongoose = require('mongoose');

const patientSchema = mongoose.Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Admin',
        },
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        addressLine1: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        aadharNumber: {
            type: Number,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String
          },        
        // Additional medical and personal data
        hemoglobin: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        bloodGroup: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        bloodPressure: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        heartRate: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        weight: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        fastingBloodSugar: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        cbc: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        urinalysis: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        serumElectrolytes: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        lipidProfile: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        tsh: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        sgpt: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        platelet: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        hiv: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        chronicDisease: {
            value: { type: String, required: true },
            unit: { type: String, required: true },
            range: { type: String, required: true },
        },
        medicalHistory: {
            previousCondition: {
                value: { type: String, required: true },
                unit: { type: String, required: true },
                range: { type: String, required: true },
            },
            vaccination: {
                value: { type: String, required: true },
                unit: { type: String, required: true },
                range: { type: String, required: true },
            },
            currentMedication: {
                value: { type: String, required: true },
                unit: { type: String, required: true },
                range: { type: String, required: true },
            },
        },
        // Update documentFile to support multiple files as an array of objects
        documentFile: [
            {
                data: Buffer,             // Store file data
                contentType: String       // Store MIME type of the file
            }
        ],
        qrCode: {
            type: String,
            default: ''
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Patient', patientSchema);
