import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Usa un Access Token de prueba (sandbox seller)
const client = new MercadoPagoConfig({
  accessToken: process.env.TEST_ACCESS_TOKEN, // 🔹 Token de PRUEBA
});

// ✅ Ruta para crear la preferencia de pago
router.post("/create_preference", async (req, res) => {
  try {
    const { title, quantity, price } = req.body;

    if (!title || !quantity || !price) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title,
            quantity,
            currency_id: "COP",
            unit_price: Number(price),
          },
        ],
        back_urls: {
          success: "http://localhost:5173/success",
          failure: "http://localhost:5173/failure",
          pending: "http://localhost:5173/pending",
        },
        //auto_return: "approved",

        // ✅ Modo de prueba
        test: true, // explícitamente sandbox
      },
    });

    console.log("✅ Preferencia creada:", result.id);
    res.status(200).json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error("❌ Error al crear preferencia:");
    console.error("Mensaje:", error.message);
    console.error("Detalles:", error.cause || error);

    res.status(500).json({
      error: "Error al crear preferencia",
      details: error.message,
      cause: error.cause || null,
    });
  }
});

export default router;
