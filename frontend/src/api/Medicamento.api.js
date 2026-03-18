// api/Medicamento.api.js
import axios from "./axios";

export const getMedicamentoRequest = async () => {
  return await axios.get("http://localhost:3000/api/v1/medicamentos");
};

export const getMedicamentoByIdRequest = async (id) => {
  return await axios.get(`http://localhost:3000/api/v1/medicamentos/${id}`);
};

export const createMedicamentoRequest = async (medicamento) => {
  return await axios.post(
    "http://localhost:3000/api/v1/medicamentos",
    medicamento,
  );
};

export const updateMedicamentoRequest = async (id, medicamento) => {
  return await axios.put(
    `http://localhost:3000/api/v1/medicamentos/${id}`,
    medicamento,
  );
};

export const deleteMedicamentoRequest = async (id) => {
  return await axios.delete(`http://localhost:3000/api/v1/medicamentos/${id}`);
};
