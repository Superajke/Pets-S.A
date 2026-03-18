// src/components/Mascotas/FuncionMascota.jsx
import React from "react";

function FuncionMascota({ mascota, onEditMascota }) {
  return (
    <a onClick={() => onEditMascota(mascota)} style={{ cursor: "pointer" }}>
      ✏️
    </a>
  );
}

export default FuncionMascota;
