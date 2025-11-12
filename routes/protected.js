// routes/protected.js
import express from "express";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Ruta protegida general (solo requiere login)
router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "Bienvenido a la ruta protegida",
    user: req.user,
  });
});

// Ruta protegida solo para administradores
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({
    message: "Bienvenido al panel de administración",
    user: req.user,
  });
});

export default router;
