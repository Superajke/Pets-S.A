// src/hooks/useReporte.jsx
import { useEffect, useState } from "react";
import { getReporteRequest } from "../api/Reporte.api";

function useReporte() {
  const [reporte, setReporte] = useState([]);

  useEffect(() => {
    const getReporte = async () => {
      try {
        const response = await getReporteRequest();
        setReporte(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getReporte();
  }, []);

  return reporte;
}

export default useReporte;
