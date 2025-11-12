// middleware/auth.js
import jwt from "jsonwebtoken";

// Verifica que el token JWT sea válido
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ← Aquí viene el email, id y role
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

// Permite solo usuarios con rol admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acceso denegado: solo administradores" });
  }
  next();
};

// Export default para compatibilidad con import anterior
export default verifyToken;
