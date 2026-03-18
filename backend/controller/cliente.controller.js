// backend/controller/cliente.controller.js
import { pool } from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM clientes ORDER BY cliente_id ASC");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "SELECT * FROM clientes WHERE cliente_id = ?",
      [id],
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postCliente = async (req, res) => {
  const { cedula, nombres, apellidos, direccion, telefono } = req.body;

  try {
    const [cliente] = await pool.query(
      "SELECT * FROM clientes WHERE cedula = ?",
      [cedula],
    );

    if (cliente.length > 0) {
      return res.status(400).json({ error: "Cédula en uso" });
    }

    const [result] = await pool.query(
      "INSERT INTO clientes (cedula, nombres, apellidos, direccion, telefono) VALUES (?, ?, ?, ?, ?)",
      [cedula, nombres, apellidos, direccion, telefono],
    );

    res.status(201).json({
      message: "Cliente creado",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { cedula, nombres, apellidos, direccion, telefono } = req.body;

  try {
    const [cliente] = await pool.query(
      "SELECT * FROM clientes WHERE cliente_id = ?",
      [id],
    );

    if (cliente.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const [duplicado] = await pool.query(
      "SELECT * FROM clientes WHERE cedula = ? AND cliente_id != ?",
      [cedula, id],
    );

    if (duplicado.length > 0) {
      return res.status(400).json({ error: "Cédula en uso" });
    }

    await pool.query(
      "UPDATE clientes SET cedula = ?, nombres = ?, apellidos = ?, direccion = ?, telefono = ? WHERE cliente_id = ?",
      [cedula, nombres, apellidos, direccion, telefono, id],
    );

    res.json({ message: "Cliente actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "SELECT * FROM clientes WHERE cliente_id = ?",
      [id],
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const response =
      result[0].active === 1 ? "Cliente eliminado" : "Cliente restaurado";

    await pool.query("UPDATE clientes SET active = ? WHERE cliente_id = ?", [
      result[0].active === 1 ? 0 : 1,
      id,
    ]);

    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
