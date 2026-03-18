// backend/controller/mascota.controller.js
import { pool } from "../db.js";

export const getMascotas = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        m.*,
        c.nombres AS cliente_nombres,
        c.apellidos AS cliente_apellidos,
        med.nombre AS medicamento_nombre
      FROM mascotas m
      INNER JOIN clientes c ON m.cliente_id = c.cliente_id
      INNER JOIN medicamentos med ON m.medicamento_id = med.medicamento_id
      ORDER BY m.mascota_id ASC
    `);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMascotaById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `SELECT 
        m.*,
        c.nombres AS cliente_nombres,
        c.apellidos AS cliente_apellidos,
        med.nombre AS medicamento_nombre
      FROM mascotas m
      INNER JOIN clientes c ON m.cliente_id = c.cliente_id
      INNER JOIN medicamentos med ON m.medicamento_id = med.medicamento_id
      WHERE m.mascota_id = ?`,
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postMascota = async (req, res) => {
  const {
    identificacion,
    nombre,
    raza,
    edad,
    peso,
    cliente_id,
    medicamento_id,
  } = req.body;

  try {
    const [mascota] = await pool.query(
      "SELECT * FROM mascotas WHERE identificacion = ?",
      [identificacion]
    );

    if (mascota.length > 0) {
      return res.status(400).json({ error: "Identificación en uso" });
    }

    const [cliente] = await pool.query(
      "SELECT * FROM clientes WHERE cliente_id = ? AND active = 1",
      [cliente_id]
    );

    if (cliente.length === 0) {
      return res.status(400).json({ error: "Cliente no válido" });
    }

    const [medicamento] = await pool.query(
      "SELECT * FROM medicamentos WHERE medicamento_id = ? AND active = 1",
      [medicamento_id]
    );

    if (medicamento.length === 0) {
      return res.status(400).json({ error: "Medicamento no válido" });
    }

    const [result] = await pool.query(
      "INSERT INTO mascotas (identificacion, nombre, raza, edad, peso, cliente_id, medicamento_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [identificacion, nombre, raza, edad, peso, cliente_id, medicamento_id]
    );

    res.status(201).json({
      message: "Mascota creada",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMascota = async (req, res) => {
  const { id } = req.params;
  const {
    identificacion,
    nombre,
    raza,
    edad,
    peso,
    cliente_id,
    medicamento_id,
  } = req.body;

  try {
    const [mascota] = await pool.query(
      "SELECT * FROM mascotas WHERE mascota_id = ?",
      [id]
    );

    if (mascota.length === 0) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    const [duplicado] = await pool.query(
      "SELECT * FROM mascotas WHERE identificacion = ? AND mascota_id != ?",
      [identificacion, id]
    );

    if (duplicado.length > 0) {
      return res.status(400).json({ error: "Identificación en uso" });
    }

    const [cliente] = await pool.query(
      "SELECT * FROM clientes WHERE cliente_id = ? AND active = 1",
      [cliente_id]
    );

    if (cliente.length === 0) {
      return res.status(400).json({ error: "Cliente no válido" });
    }

    const [medicamento] = await pool.query(
      "SELECT * FROM medicamentos WHERE medicamento_id = ? AND active = 1",
      [medicamento_id]
    );

    if (medicamento.length === 0) {
      return res.status(400).json({ error: "Medicamento no válido" });
    }

    await pool.query(
      "UPDATE mascotas SET identificacion = ?, nombre = ?, raza = ?, edad = ?, peso = ?, cliente_id = ?, medicamento_id = ? WHERE mascota_id = ?",
      [identificacion, nombre, raza, edad, peso, cliente_id, medicamento_id, id]
    );

    res.json({ message: "Mascota actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMascota = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "SELECT * FROM mascotas WHERE mascota_id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    const response =
      result[0].active === 1 ? "Mascota eliminada" : "Mascota restaurada";

    await pool.query(
      "UPDATE mascotas SET active = ? WHERE mascota_id = ?",
      [result[0].active === 1 ? 0 : 1, id]
    );

    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
