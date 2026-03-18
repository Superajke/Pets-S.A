import { pool } from "../db.js";

export const getMedicamentos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM medicamentos");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMedicamentoById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "SELECT * FROM medicamentos WHERE medicamento_id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Medicamento no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postMedicamento = async (req, res) => {
  const { nombre, descripcion, dosis } = req.body;

  try {
    const [medicamento] = await pool.query(
      "SELECT * FROM medicamentos WHERE nombre = ?",
      [nombre]
    );

    if (medicamento.length > 0) {
      return res.status(400).json({ error: "Medicamento ya registrado" });
    }

    const [result] = await pool.query(
      "INSERT INTO medicamentos (nombre, descripcion, dosis) VALUES (?, ?, ?)",
      [nombre, descripcion, dosis]
    );

    res.status(201).json({
      message: "Medicamento creado",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMedicamento = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, dosis } = req.body;

  try {
    const [medicamento] = await pool.query(
      "SELECT * FROM medicamentos WHERE medicamento_id = ?",
      [id]
    );

    if (medicamento.length === 0) {
      return res.status(404).json({ error: "Medicamento no encontrado" });
    }

    const [duplicado] = await pool.query(
      "SELECT * FROM medicamentos WHERE nombre = ? AND medicamento_id != ?",
      [nombre, id]
    );

    if (duplicado.length > 0) {
      return res.status(400).json({ error: "Nombre de medicamento en uso" });
    }

    await pool.query(
      "UPDATE medicamentos SET nombre = ?, descripcion = ?, dosis = ? WHERE medicamento_id = ?",
      [nombre, descripcion, dosis, id]
    );

    res.json({ message: "Medicamento actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMedicamento = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "SELECT * FROM medicamentos WHERE medicamento_id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Medicamento no encontrado" });
    }

    const response =
      result[0].active === 1
        ? "Medicamento eliminado"
        : "Medicamento restaurado";

    await pool.query(
      "UPDATE medicamentos SET active = ? WHERE medicamento_id = ?",
      [result[0].active === 1 ? 0 : 1, id]
    );

    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
