// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const surveyRoutes = require('./routes/surveyRoutes');
app.use('/api/surveys', surveyRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
