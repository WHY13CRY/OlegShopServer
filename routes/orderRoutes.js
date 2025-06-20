const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkout } = require('../controllers/orderController');

router.use(authMiddleware);
router.post('/checkout', checkout);

module.exports = router;
