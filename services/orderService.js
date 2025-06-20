const pool = require('../config/db');

const createOrder = async (userId, fullName, phone, country, city, street, postalCode) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const cartItemsRes = await client.query(`
      SELECT ci.product_id, ci.quantity, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = $1
    `, [userId]);

    const cartItems = cartItemsRes.rows;

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderRes = await client.query(`
      INSERT INTO orders (user_id, full_name, phone, country, city, street, postal_code, total_price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `, [userId, fullName, phone, country, city, street, postalCode, totalPrice]);

    const orderId = orderRes.rows[0].id;

    for (const item of cartItems) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
      `, [orderId, item.product_id, item.quantity, item.price]);
    }

    await client.query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);

    await client.query('COMMIT');
    return { orderId, totalPrice };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createOrder
};
