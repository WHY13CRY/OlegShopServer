const express = require('express');
const cors = require('cors');
const shopRoutes = require('./routes/shopRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', shopRoutes);

module.exports = app;
