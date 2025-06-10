const cartService = require('../services/cartService');

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await cartService.getCartItemsByUser(userId);
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid product ID or quantity' });
    }

    const updatedItem = await cartService.addOrUpdateCartItem(userId, productId, quantity);
    res.status(201).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add/update cart item' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId);
    await cartService.removeCartItem(userId, productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
};

const clearUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await cartService.clearCart(userId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearUserCart
};
