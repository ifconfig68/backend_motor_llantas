import { readTiresFromCSV } from "../services/csvService.js";
import { vehicleData } from "../data/vehicleData.js";


export const etlMiddleware = async (req, res, next) => {
  try {
    const { marca, modelo, año } = req.vehicle;

    // 1️⃣ Extract
    const csvTires = await readTiresFromCSV();

    // 2️⃣ Transform
    const compatibleSizes = vehicleData[marca]?.[año]?.[modelo] || [];
    const cleanTires = csvTires.map(t => ({
      size: t.size.trim().toUpperCase(),
      marca: t.marca,
      precio: t.precio
    }));

    // 3️⃣ Load
    const matchedTires = cleanTires.filter(tire =>
      compatibleSizes.includes(tire.size)
    );

    // Adjuntar resultado al request
    req.compatibleTires = matchedTires;
    next();
  } catch (error) {
    console.error("Error en ETL:", error);
    res.status(500).json({ error: "Error procesando datos ETL" });
  }
};
