// src/api/Reporte.api.js
import axios from "./axios";

export const getReporteRequest = async () => {
  return await axios.get("http://localhost:3000/api/v1/reportes/clientes-medicamentos");
};
