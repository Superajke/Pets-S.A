import axios from "./axios";

export const getClientRequest = async () => {
  return await axios.get("http://localhost:3000/api/v1/clientes");
};

export const getClientByIdRequest = async (id) => {
  return await axios.get(`http://localhost:3000/api/v1/clientes/${id}`);
};

export const createClientRequest = async (cliente) => {
  return await axios.post("http://localhost:3000/api/v1/clientes", cliente);
};

export const updateClientRequest = async (id, cliente) => {
  return await axios.put(`http://localhost:3000/api/v1/clientes/${id}`, cliente);
};

export const deleteClientRequest = async (id) => {
  return await axios.delete(`http://localhost:3000/api/v1/clientes/${id}`);
};
