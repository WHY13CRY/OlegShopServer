const express = require('express');
const cors = require('cors');
const shopRoutes = require('./routes/shopRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes')
const searchRoutes = require('./routes/searchRoutes')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cart', cartRoutes);
app.use('/api/users', authRoutes);
app.use('/api', shopRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes)
app.use('/api/search', searchRoutes)

module.exports = app;
