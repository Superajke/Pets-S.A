// src/hooks/useMascotas.jsx
import { useEffect, useState } from "react";
import { getMascotaRequest } from "../api/Mascota.api";

function useMascotas(reload) {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const getMascotas = async () => {
      try {
        let t = await getMascotaRequest();
        let data = t.data;
        data = data.filter((session) => session.active === 1);
        setMascotas(data);
      } catch (error) {
        console.error(error);
      }
    };

    getMascotas();
  }, [reload]);

  return mascotas;
}

export default useMascotas;
