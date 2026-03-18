import React from "react";

function FuncionCliente({ cliente, onEditCliente }) {
  return (
    <a onClick={() => onEditCliente(cliente)} style={{ cursor: "pointer" }}>
      ✏️
    </a>
  );
}

export default FuncionCliente;
