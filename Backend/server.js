const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const announcementsRouter = require('./routes/announcements');
const authRouter = require('./routes/auth');
const topupRouter = require('./routes/topup');
const walletRouter = require('./routes/wallet');
const qrCodeRoutes = require('./routes/qrCodeRoutes'); // QR code routes

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests

// API Routes
app.use('/api/auth', authRouter); // Authentication routes
app.use('/api/announcements', announcementsRouter); // Announcements routes
app.use('/api/topup', topupRouter); // Top-up related routes
app.use('/api/wallet', walletRouter); // Wallet routes, including balance and fare deduction
app.use('/api/qrcode', qrCodeRoutes); // QR code routes

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
