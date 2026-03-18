// backend/routes/mascota.routes.js
import { Router } from "express";
import {
  getMascotas,
  getMascotaById,
  postMascota,
  updateMascota,
  deleteMascota,
} from "../controller/mascota.controller.js";

const router = Router();

router.get("/", getMascotas);
router.get("/:id", getMascotaById);
router.post("/", postMascota);
router.put("/:id", updateMascota);
router.delete("/:id", deleteMascota);

export default router;
