const shopService = require('../services/shopService');

const getProducts = async (req, res) => {
  try {
    const products = await shopService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Database query failed' });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await shopService.getProductById(id);
    if(!product) {
      return res.status(404).json({error:'Product not found'})
    }
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Database query failed' });
  }
};

module.exports = { getProducts, getOneProduct };
