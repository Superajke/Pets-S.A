// backend/controller/reporte.controller.js
import { pool } from "../db.js";

export const getReporteClientesMedicamentos = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT
        CONCAT(c.nombres, ' ', c.apellidos) AS cliente,
        c.telefono,
        m.nombre AS mascota,
        m.raza,
        med.nombre AS medicamento,
        med.dosis
      FROM mascotas m
      INNER JOIN clientes c ON m.cliente_id = c.cliente_id
      INNER JOIN medicamentos med ON m.medicamento_id = med.medicamento_id
      WHERE m.active = 1
        AND c.active = 1
        AND med.active = 1
      ORDER BY c.cliente_id ASC, m.nombre ASC
    `);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
