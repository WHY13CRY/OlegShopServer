const pool = require('../config/db');

const getCartItemsByUser = async (userId) => {
  const query = `
    SELECT ci.id AS cart_item_id, ci.quantity,  ci.product_id, p.*
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = $1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

const addOrUpdateCartItem = async (userId, productId, quantity) => {
  const query = `
    INSERT INTO cart_items (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = EXCLUDED.quantity
    RETURNING id AS cart_item_id, user_id, product_id, quantity;
  `;
  const result = await pool.query(query, [userId, productId, quantity]);
  return result.rows[0];
};

const removeCartItem = async (userId, productId) => {
  const query = `DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2`;
  await pool.query(query, [userId, productId]);
};

const clearCart = async (userId) => {
  const query = `DELETE FROM cart_items WHERE user_id = $1`;
  await pool.query(query, [userId]);
};

module.exports = {
  getCartItemsByUser,
  addOrUpdateCartItem,
  removeCartItem,
  clearCart
};
