import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/llantas", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        id,
        title,
        Price AS price,
        sale_price AS oldPrice,
        image_link AS image,
        stock
      FROM llantas_motorllantas
      WHERE Price > 0
      LIMIT 300;
    `);

    const formatted = rows.map(item => ({
      ...item,
      imageUrl: item.image,
      image: undefined,
      oldPrice: item.oldPrice || undefined,
      brandLogo: "/brands/default.png",
      grip: "A",
      rating: 4,
      shipping: "Envio inmediato",
      discount: item.oldPrice ? Math.floor((1 - item.price / item.oldPrice) * 100) : 0
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
