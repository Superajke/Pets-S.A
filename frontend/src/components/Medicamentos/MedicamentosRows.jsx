// components/Medicamentos/MedicamentosRows.jsx
import React from "react";
import useMedicamentos from "../../hooks/useMedicamentos";
import DeleteMedicamento from "./DeleteMedicamento";
import FuncionMedicamento from "./FuncionMedicamento";

function MedicamentosRows({ onEditMedicamento, reload }) {
  const medicamentos = useMedicamentos(reload);

  return (
    <>
      {medicamentos.map((medicamento) => (
        <tr key={medicamento.medicamento_id}>
          <td>{medicamento.medicamento_id}</td>
          <td>{medicamento.nombre}</td>
          <td>{medicamento.descripcion}</td>
          <td>{medicamento.dosis}</td>
          <td>
            <FuncionMedicamento
              medicamento={medicamento}
              onEditMedicamento={onEditMedicamento}
            />
          </td>
          <td>
            <DeleteMedicamento medicamento_id={medicamento.medicamento_id} />
          </td>
        </tr>
      ))}
    </>
  );
}

export default MedicamentosRows;
