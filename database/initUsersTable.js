// database/initUsersTable.js
import pool from "../config/db.js";
import bcrypt from "bcrypt";


export async function initUsersTable() {
  try {
    // 1. Crear tabla si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Tabla users verificada/creada.");

    // 2. Verificar si existe el correo del admin
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = 'admin@local'"
    );

    if (existing.length > 0) {
      console.log("ℹ️ El admin ya existe, no se creó.");
      return;
    }

    // 3. Crear password cifrada
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // 4. Insertar admin inicial
    await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ('Admin','admin@local', ?, 'admin')`,
      [hashedPassword]
    );

    console.log("✅ Admin creado: admin@local / admin123");

  } catch (error) {
    console.error("❌ Error initUsersTable:", error);
  }
}

export default initUsersTable;