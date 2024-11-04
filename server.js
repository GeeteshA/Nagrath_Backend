const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Increase the payload limit
app.use(bodyParser.json({ limit: '10mb' }));  // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));
app.use(express.json()); 
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/admins', adminRoutes); // Routes for Admin and Super Admin management
app.use('/api/patients', patientRoutes); // Routes for Patient management
app.use('/api/auth', authRoutes); // Routes for authentication (login, etc.)

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
