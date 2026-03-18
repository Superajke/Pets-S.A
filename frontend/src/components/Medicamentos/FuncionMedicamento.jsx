// components/Medicamentos/FuncionMedicamento.jsx
import React from "react";

function FuncionMedicamento({ medicamento, onEditMedicamento }) {
  return (
    <a
      onClick={() => onEditMedicamento(medicamento)}
      style={{ cursor: "pointer" }}
    >
      ✏️
    </a>
  );
}

export default FuncionMedicamento;
