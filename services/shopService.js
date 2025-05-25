const pool = require('../config/db');

const getAllProducts = async () => {
  const query = `
    SELECT
      p.*,

      COALESCE(ROUND(AVG(r.rating)::numeric, 1), 0) AS rating,

      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object('id', c.id, 'name', c.name)
        ) FILTER (WHERE c.id IS NOT NULL),
        '[]'
      ) AS categories

    FROM products p
    LEFT JOIN reviews r ON r.product_id = p.id
    LEFT JOIN product_categories pc ON pc.product_id = p.id
    LEFT JOIN categories c ON c.id = pc.category_id

    GROUP BY p.id;
  `;
  const result = await pool.query(query);
  return result.rows;
};

const getProductById = async (id) => {
  const query = `
  SELECT
    p.*,

    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object(
          'id', pi.id,
          'image_url', pi.image_url,
          'alt_text', pi.alt_text
        )
      ) FILTER (WHERE pi.id IS NOT NULL),
      '[]'
    ) AS images,

    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object(
          'id', c.id,
          'name', c.name
        )
      ) FILTER (WHERE c.id IS NOT NULL),
      '[]'
    ) AS categories,

    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object(
          'id', r.id,
          'rating', r.rating,
          'comment', r.comment,
          'user_id', r.user_id,
          'created_at', r.created_at
        )
      ) FILTER (WHERE r.id IS NOT NULL),
      '[]'
    ) AS reviews

  FROM products p

  LEFT JOIN product_images pi ON pi.product_id = p.id

  LEFT JOIN product_categories pc ON pc.product_id = p.id
  LEFT JOIN categories c ON c.id = pc.category_id

  LEFT JOIN reviews r ON r.product_id = p.id

  WHERE p.id = $1
  GROUP BY p.id;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { getAllProducts, getProductById };
