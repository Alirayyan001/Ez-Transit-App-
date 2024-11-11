const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const announcementsRouter = require('./routes/announcements');
const authRouter = require('./routes/auth');
const topupRouter = require('./routes/topup');
const walletRouter = require('./routes/wallet');
const journeyRouter = require('./routes/journey')


// Load config
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/announcements', announcementsRouter);
app.use('/api/topup', topupRouter);
app.use('/api/wallet', walletRouter);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
