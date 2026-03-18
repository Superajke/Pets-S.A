// backend/routes/medicamento.routes.js
import { Router } from "express";
import {
  getMedicamentos,
  getMedicamentoById,
  postMedicamento,
  updateMedicamento,
  deleteMedicamento,
} from "../controller/medicamento.controller.js";

const router = Router();

router.get("/", getMedicamentos);
router.get("/:id", getMedicamentoById);
router.post("/", postMedicamento);
router.put("/:id", updateMedicamento);
router.delete("/:id", deleteMedicamento);

export default router;
