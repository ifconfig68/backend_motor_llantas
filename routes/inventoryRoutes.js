import express from "express";
import pool from "../config/db.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ✅ Obtener todos los productos (solo los campos importantes para inventario)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id,
        sku,
        name,
        title,
        brand,
        model,
        car_type,
        regular_price,
        stock,
        availability,
        image_link,
        link
      FROM llantas_motorllantas
      
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// ✅ Actualizar stock, precio y disponibilidad
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { regular_price, stock, availability, name, model, car_type, sku } = req.body;

  try {
    await pool.query(
      `UPDATE llantas_motorllantas
       SET regular_price = ?, stock = ?, availability = ?, name = ?, model = ?, car_type = ?, sku = ?
       WHERE id = ?`,
      [regular_price, stock, availability, name, model, car_type, sku, id]
    );
    res.json({ message: "Producto actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// ✅ Eliminar producto
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM llantas_motorllantas WHERE id = ?`, [id]);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default router;
