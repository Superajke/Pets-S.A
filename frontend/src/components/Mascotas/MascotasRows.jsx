// src/components/Mascotas/MascotasRows.jsx
import React from "react";
import useMascotas from "../../hooks/useMascotas";
import FuncionMascota from "./FuncionMascota";
import DeleteMascota from "./DeleteMascota";

function MascotasRows({ onEditMascota, onDeleteSuccess, reload }) {
  const mascotas = useMascotas(reload);

  return (
    <>
      {mascotas.map((mascota) => (
        <tr key={mascota.mascota_id}>
          <td>{mascota.mascota_id}</td>
          <td>{mascota.identificacion}</td>
          <td>{mascota.nombre}</td>
          <td>{mascota.raza}</td>
          <td>{mascota.edad}</td>
          <td>{mascota.peso}</td>
          <td>{mascota.cliente_nombres} {mascota.cliente_apellidos}</td>
          <td>{mascota.medicamento_nombre}</td>
          <td>
            <FuncionMascota
              mascota={mascota}
              onEditMascota={onEditMascota}
            />
          </td>
          <td>
            <DeleteMascota
              mascota_id={mascota.mascota_id}
              onSuccess={onDeleteSuccess}
            />
          </td>
        </tr>
      ))}
    </>
  );
}

export default MascotasRows;
