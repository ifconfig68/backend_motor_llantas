import express from "express";
import { getVehicleInfo } from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/:plate", getVehicleInfo);

export default router;
