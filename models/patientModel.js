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
        bloodGroup: {
            type: String,
            required: true,
        },
        addressLine1: {
            type: String,
        },
        address: {
            type: String,
        },
        pincode: {
            type: Number,
        },
        district: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other'],
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        aadharNumber: {
            type: String,
            required: true,
            unique: true, 
            index: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        // Additional medical and personal data
        hemoglobin: {
            value: { type: String },
            range: { type: String, default: '13.5-17.5' },
            unit: { type: String, default: 'g/dl' }
        },
        bloodPressure: {
            value: { type: String },
            range: { type: String, default: '120/80' },
            unit: { type: String, default: 'mmHg' }
        },
        heartRate: {
            value: { type: String },
            range: { type: String, default: '60-100' },
            unit: { type: String, default: 'bpm' }
        },
        fastingBloodSugar: {
            value: { type: String },
            range: { type: String, default: '70-100'},
            unit: { type: String, default: 'mg/dL' }
        },
        calcium: {
            value: { type: String },
            range: { type: String },
            options: { type: [String], default: ['Adult: 8.5-11.0', 'Child: 6.7-10.5'] },
            unit: { type: String, default: 'mg/dL' }
        },
        // Blood CBC 
        bloodCbc: {
            rbcCount: {
                value: { type: String },
                unit: { type: String, default: 'milli./cu.mm' },
                range: { type: String, default: '4.5-5.9' }
            },
            packedCellVolume: {
                value: { type: String },
                unit: { type: String, default: '%' },
                range: { type: String, default: '37.53' }
            },
            meanCellVolume: {
                value: { type: String },
                unit: { type: String, default: 'fl' },
                range: { type: String, default: '80-100' }
            },
            meanCellHemoglobin: {
                value: { type: String },
                unit: { type: String, default: 'pg/g/dl' },
                range: { type: String, default: '26.34' }
            },
            meanCellHbConc: {
                value: { type: String },
                unit: { type: String, default: '%' },
                range: { type: String, default: '11-16' }
            },
            rdwCV: {
                value: { type: String },
                unit: { type: String, default: 'fl' },
                range: { type: String, default: '35-56' }
            },
            rdwSD: {
                value: { type: String },
                unit: { type: String, default: '/cumm' },
                range: { type: String, default: '4500-11000' },
            },
        },

        // Urine test
        urineTest: {
            colour: {
                value: { type: String },
                unit: { type: String },
                range: { type: String, default: 'Pale Yellow' }
            },
            appearance: {
                value: { type: String },
                unit: { type: String },
                range: { type: String, default: 'Clear' }
            },
            reaction: {
                value: { type: String },
                unit: { type: String },
                range: { type: String, default: '6.0-8.5' }
            },
            specificGravity: {
                value: { type: String },
                unit: { type: String },
                range: { type: String, default: '1.005-1.030' }
            },
            pusCells: {
                value: { type: String },
                unit: { type: String, default: '/HFP' },
                range: { type: String, default: '0-5' }
            },
            epithelialCells: {  // Fixed typo
                value: { type: String },
                unit: { type: String, default: '/HFP' },
                range: { type: String, default: '-' }
            },
            redBloodCell: {
                value: { type: String, default: 'Nil' },
                unit: { type: String, default: '/HFP' },
                range: { type: String, default: 'Nil' }
            },
            spermatozoa: {
                value: { type: String },
                unit: { type: String, default: '/HPF' },
                range: { type: String, default: 'Absent' }
            },
            casts: {
                value: { type: String },
                unit: { type: String, default: '/HPF' },
                range: { type: String, default: 'Absent' }
            },
            crystals: {
                value: { type: String,  },
                unit: { type: String, default: '/HPF' },
                range: { type: String, default: 'Absent' }
            },
            yeastCell: {
                value: { type: String },
                unit: { type: String, default: '/HPF' },
                range: { type: String, default: 'Absent' }
            },
            bacteria: {  // Fixed typo
                value: { type: String },
                unit: { type: String, default: '/HPF' },
                range: { type: String, default: 'Absent' }
            },
            esr: {
                value: { type: String },
                unit: { type: String },
                range: { type: String },
                options: { type: [String], default: ['1-13 male', '0-20 women'] }
            },
        },

        // Tests 
        lipidProfile: {
            cholesterolTotal: {
                value: { type: String },
                unit: { type: String },
                range: { type: String },
                options: [{ type: String }],
            },
            triglycerides: {
                value: { type: String },
                unit: { type: String },
                range: { type: String },
                options: [{ type: String }],
            },
            hdlCholesterol: {
                value: { type: String },
                unit: { type: String },
                range: { type: String },
                range: { type: String },
            },
            ldlCholesterol: {
                value: { type: String },
                unit: { type: String },
                range: { type: String },
                options: [{ type: String }],
            },
            vldlCholesterol: {
                value: { type: String },
                unit: { type: String },
                range: { type: String },
            },
            cholHdlCholRatio: {
                value: { type: String },
                unit: { type: String },
                range: { type: String },
            },
            ldlHdlCholRatio: {
                value: { type: String },
                unit: { type: String },
                range: { type: String },
            },
        },
        
        // TSH Test
        tshTest: {
            triiodothyronine: {
                value: { type: String },
                unit: { type: String, default: 'ng/dL' },
                range: { type: String, default: '0.58-1.62' }
            },
            thyroxine: {
                value: { type: String },
                unit: { type: String, default: 'ug/dL' },
                range: { type: String, default: '5.0-14.5' }
            },
            tsh: {
                value: { type: String },
                unit: { type: String, default: 'uIU/mL' },
                options: { type: [String], default: ['Normal: 0.35-5.1', 'Pregnant T1: 0.05-4.73', 'Pregnant T2: 0.30-4.79', 'Pregnant T3: 0.50-6.02'] }
            },
            sgot: {
                value: { type: String },
                unit: { type: String, default: 'IU/L' },
                range: { type: String, default: '00-46' }
            },
            sgpt: {
                value: { type: String },
                unit: { type: String, default: 'IU/L' },
                range: { type: String, default: '00-49' }
            },
            alkalinePhosphatase: {
                value: { type: String },
                unit: { type: String, default: 'U/L' },
                range: { type: String, default: '30-145' }
            },
            totalProtein: {
                value: { type: String },
                unit: { type: String, default: 'g/dL' },
                range: { type: String, default: '6.0-8.30' }
            },
            albumin: {
                value: { type: String },
                unit: { type: String, default: 'g/dL' },
                range: { type: String, default: '3.5-5.0' }
            },
            globulin: {
                value: { type: String },
                unit: { type: String, default: 'g/dL' },
                range: { type: String, default: '1.50-3.0' }
            },
            albRatio: {
                value: { type: String },
                unit: { type: String, default: 'milli./cu.mm' },
                range: { type: String, default: '0.90-2.00' }
            },
            plateletCount: {
                value: { type: String },
                unit: { type: String, default: 'Lakh/cumm' },
                range: { type: String, default: '1.5-4.5' }
            },
            mpv: {
                value: { type: String },
                unit: { type: String, default: 'fl' },
                range: { type: String, default: '6.5-12.0' }
            },
            pdw: {
                value: { type: String },
                unit: { type: String },
                range: { type: String, default: '15-17' }
            },
            hivFirst: {
                value: { type: String },
                unit: { type: String },
                range: { type: String, default: 'Non – Reactive' }
            },
            hivSecond: {
                value: { type: String },
                unit: { type: String },
                range: { type: String, default: 'Non – Reactive' }
            },
            HBA1C: {
                value: { type: String },
                unit: { type: String, default: '%' },
                options: { type: [String], default: ['Non-Diabetic: 4-6', 'Excellent Control: 6-7', 'Fair to Good Control: 7-8', 'Unsatisfactory Control: 8-10', 'Poor Control: >10'] }
            },
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
                data: Buffer, // Store file data
                contentType: String, // Store MIME type of the file
            },
        ],
        qrCode: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Patient', patientSchema);






