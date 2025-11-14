import pool from "../config/db.js";

export const initContactTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contactos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Tabla 'contactos' lista");
  } catch (err) {
    console.error("Error creando tabla 'contactos':", err);
  }
};


// database/initOrdersTable.js
export const initOrdersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255),
        address1 VARCHAR(255) NOT NULL,
        address2 VARCHAR(255),
        city VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        postcode VARCHAR(20),
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Tabla 'orders' lista");
  } catch (err) {
    console.error("Error creando tabla 'orders':", err);
  }
};
