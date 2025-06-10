const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('../routes/products');
const logger = require('../middleware/logger');
const server = require('./server');
const errorHandler = require('../middleware/errorHandler');
const errorHandlerTwo = require('../utils/customErrors');
const { v4: uuidv4 } = require('uuid');
const uniqueID = uuidv4();
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});