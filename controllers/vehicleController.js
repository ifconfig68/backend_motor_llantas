import { getVehicleByPlate } from "../services/mockoonService.js";

export const getVehicleInfo = async (req, res) => {
  try {
    const { plate } = req.params;
    const vehicle = await getVehicleByPlate(plate);
    console.log(" El backend esta respondiendo :", vehicle);
    res.json(vehicle);
  } catch (error) {
    console.error(" Error el backend esta respondiendo :", error.message);
    res.status(500).json({ error: "No se pudo obtener la información del vehículo. " });
  }
};
