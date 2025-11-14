import express from "express";
import { getContacts, createContact } from "../controllers/contactController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Crear contacto (cualquiera puede enviar)
router.post("/", createContact);

// Obtener contactos (solo admin)
router.get("/", verifyToken, isAdmin, getContacts);

// Eliminar contacto (solo admin)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM contactos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }

    res.json({ message: "Contacto eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
