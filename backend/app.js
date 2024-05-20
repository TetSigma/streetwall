const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const dashboardRoute = require('./routes/dashboardRoute'); // Corrected import path
const postRoute = require('./routes/postRoute');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', authRoutes);

app.use('/api', dashboardRoute);

app.use('/api', postRoute);

module.exports = app;
