// controllers/contactController.js
import pool from "../config/db.js"; // << verifica que la ruta sea correcta según tu estructura

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO contactos (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject || null, message]
    );

    res.status(201).json({
      message: "Contacto guardado correctamente",
      contactId: result.insertId
    });
  } catch (err) {
    console.error("❌ Error creando contacto:", err);
    res.status(500).json({ message: "Error en el servidor", details: err.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contactos ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error obteniendo contactos:", err);
    res.status(500).json({ message: "Error en el servidor", details: err.message });
  }
};
