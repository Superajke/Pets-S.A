// backend/routes/reporte.routes.js
import { Router } from "express";
import { getReporteClientesMedicamentos } from "../controller/reporte.controller.js";

const router = Router();

router.get("/clientes-medicamentos", getReporteClientesMedicamentos);

export default router;
