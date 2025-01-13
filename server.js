const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const User = require('./models/userModel'); // Import the User model

// environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Increase the payload limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Define allowed origins
const allowedOrigins = [
 // 'http://localhost:5173',                    // Local development
  'https://nagrath-frontend.vercel.app'       // Vercel frontend URL
];

// Configure CORS with dynamic origin checking
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Super Admin Creation Logic
const createSuperAdmin = async () => {
  try {
      const existingSuperAdmin = await User.findOne({ role: 'super-admin' });
      if (!existingSuperAdmin) {
          const superAdmin = new User({
              name: 'Super Admin',
              email: process.env.SUPER_ADMIN_EMAIL,
              password: process.env.SUPER_ADMIN_PASSWORD,
              role: 'super-admin',
          });
          await superAdmin.save();
          console.log('Super Admin created successfully');
      } else {
          console.log('Super Admin already exists');
      }
  } catch (error) {
      console.error(`Error creating Super Admin: ${error.message}`);
  }
};
createSuperAdmin();


// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/admins', adminRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Define the PORT
const PORT = process.env.PORT || 5000;


// Start the server
app.listen(PORT, console.log(`Server running in http://${process.env.NODE_ENV}:${PORT}`));
