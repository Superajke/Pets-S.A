import axios from "./axios";

export const getMascotaRequest = async () => {
  return await axios.get("http://localhost:3000/api/v1/mascotas");
};

export const getMascotaByIdRequest = async (id) => {
  return await axios.get(`http://localhost:3000/api/v1/mascotas/${id}`);
};

export const createMascotaRequest = async (mascota) => {
  return await axios.post("http://localhost:3000/api/v1/mascotas", mascota);
};

export const updateMascotaRequest = async (id, mascota) => {
  return await axios.put(`http://localhost:3000/api/v1/mascotas/${id}`, mascota);
};

export const deleteMascotaRequest = async (id) => {
  return await axios.delete(`http://localhost:3000/api/v1/mascotas/${id}`);
};
