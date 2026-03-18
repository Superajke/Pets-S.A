// src/components/Mascotas/MascotasTable.jsx
import MascotasRows from "./MascotasRows";

function MascotasTable({ onEditMascota, onDeleteSuccess, reload }) {
  return (
    <section className="appointments_content__container">
      <table className="appointments__table">
        <thead>
          <tr>
            <th>#</th>
            <th>Identificación</th>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Peso</th>
            <th>Cliente</th>
            <th>Medicamento</th>
            <th>Editar</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          <MascotasRows
            onEditMascota={onEditMascota}
            onDeleteSuccess={onDeleteSuccess}
            reload={reload}
          />
        </tbody>
      </table>
    </section>
  );
}

export default MascotasTable;
