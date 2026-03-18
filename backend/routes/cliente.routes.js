// backend/routes/cliente.routes.js
import { Router } from "express";
import {
  getClientes,
  getClienteById,
  postCliente,
  updateCliente,
  deleteCliente,
} from "../controller/cliente.controller.js";

const router = Router();

router.get("/", getClientes);
router.get("/:id", getClienteById);
router.post("/", postCliente);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

export default router;
