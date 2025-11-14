import express from "express";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import pool from "./config/db.js";
import llantasRoutes from "./routes/llantasRoutes.js";
import { initContactTable } from "./database/initTables.js";
import { initUsersTable } from './database/initUsersTable.js';
import { initOrdersTable } from "./database/initTables.js";
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from "./routes/protected.js";
import matchRoutes from "./routes/matchRoutes.js";

import inventoryRoutes from "./routes/inventoryRoutes.js";


import paymentRoutes from "./routes/paymentRoutes.js";

import contactRoutes from "./routes/contactRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


initUsersTable();
initContactTable();
initOrdersTable();


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contact", contactRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api", llantasRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/payments", paymentRoutes);

app.use("/api/orders", orderRoutes);

// Servir frontend
app.use(express.static(path.join(__dirname, '../motorllantas-fork/dist')));





const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));





app.get("/test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS time");
    res.json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
});




(async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS solution");
    console.log("✅ Conectado a la base de datos. Resultado:", rows[0].solution);
  } catch (error) {
    console.error("❌ Error de conexión a la DB:", error.message);
    console.error(error); 
    console.log("HOST:", process.env.DB_HOST);

  }
})();


// SPA: todas las rutas apuntan a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../motorllantas-fork/dist/index.html'));
});