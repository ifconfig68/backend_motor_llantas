// controllers/orderController.js
import pool from "../config/db.js";

export const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      companyName,
      address1,
      address2,
      city,
      department,
      postcode,
      phone,
      email
    } = req.body;

    await pool.query(
      `INSERT INTO orders
       (first_name, last_name, company_name, address1, address2, city, department, postcode, phone, email)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, companyName, address1, address2, city, department, postcode, phone, email]
    );

    res.json({ message: "Pedido guardado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error guardando pedido" });
  }
};
