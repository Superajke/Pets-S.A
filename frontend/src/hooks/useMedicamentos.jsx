import { useEffect, useState } from "react";
import { getMedicamentoRequest } from "../api/Medicamento.api";

function useMedicamentos(reload) {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const getMedicamentos = async () => {
      try {
        let t = await getMedicamentoRequest();
        let data = t.data;
        data = data.filter((session) => session.active === 1);
        setMedicamentos(data);
      } catch (error) {
        console.error(error);
      }
    };

    getMedicamentos();
  }, [reload]);

  return medicamentos;
}

export default useMedicamentos;
