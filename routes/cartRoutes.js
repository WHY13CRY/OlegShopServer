const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getCart, addToCart, removeFromCart, clearUserCart, getCartTotal } = require('../controllers/cartController');

router.use(authMiddleware);

router.get('/', getCart);
router.get('/total', getCartTotal);
router.post('/', addToCart);
router.delete('/:productId', removeFromCart);
router.delete('/', clearUserCart);

module.exports = router;
