import { useEffect, useState } from "react";
import { getClientRequest } from "../api/Client.api";

function useClientes(reload) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const getClientes = async () => {
      try {
        let t = await getClientRequest();
        let data = t.data;
        data = data.filter((session) => session.active === 1);
        setClientes(data);
      } catch (error) {
        console.error(error);
      }
    };

    getClientes();
  }, [reload]);

  return clientes;
}

export default useClientes;
