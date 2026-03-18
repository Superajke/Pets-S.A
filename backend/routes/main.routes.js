// backend/routes/main.routes.js
import { Router } from "express";
import clienteRoute from "./cliente.routes.js";
import medicamentoRoute from "./medicamento.routes.js";
import mascotaRoute from "./mascota.routes.js";
import reporteRoute from "./reporte.routes.js";

const router = Router();

router.use("/clientes", clienteRoute);
router.use("/medicamentos", medicamentoRoute);
router.use("/mascotas", mascotaRoute);
router.use("/reportes", reporteRoute);

export default router;
