const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Basic Health Check Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// TODO: Define Routes
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/projects', require('./routes/projectRoutes'));

// TODO: Add Error Handling Middleware

module.exports = app;
