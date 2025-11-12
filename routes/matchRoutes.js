import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/**
 * Busca llantas compatibles según medida
 * Devuelve **todas las coincidencias**, sin filtrar por stock
 */
router.get("/", async (req, res) => {
  const { size } = req.query;

  if (!size) {
    return res.status(400).json({ error: "Se requiere el parámetro 'size'" });
  }

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        id,
        sku,
        name,
        brand,
        model,
        car_type,
        regular_price,
        stock,
        availability,
        image_link,
        title
      FROM llantas_motorllantas
      WHERE meta_tyre_size LIKE ? OR title LIKE ? OR name LIKE ?
      ORDER BY regular_price ASC, name ASC
      `,
      [`%${size}%`, `%${size}%`, `%${size}%`]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error al buscar llantas compatibles:", err);
    res.status(500).json({ error: "Error al buscar llantas compatibles" });
  }
});

export default router;
