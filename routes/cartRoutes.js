const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const {
  getCart,
  addToCart,
  removeFromCart,
  clearUserCart
} = require('../controllers/cartController');

router.use(authMiddleware); 

router.get('/', getCart);                     
router.post('/', addToCart);                  
router.delete('/:productId', removeFromCart);
router.delete('/', clearUserCart);           

module.exports = router;
