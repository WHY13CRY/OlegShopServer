const orderService = require('../services/orderService');

const checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, phone, country, city, street, postalCode } = req.body;

    const order = await orderService.createOrder(userId, fullName, phone, country, city, street, postalCode);

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Checkout failed' });
  }
};

module.exports = { checkout };
