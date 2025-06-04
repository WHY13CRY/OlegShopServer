const express = require('express');
const router = express.Router();
const { getProducts, getOneProduct } = require('../controllers/shopController');


router.get('/products', getProducts);
router.get('/products/:id', getOneProduct);

module.exports = router;
