// components/Medicamentos/MedicamentosTable.jsx
import MedicamentosRows from "./MedicamentosRows";

function MedicamentosTable({ onEditMedicamento, reload }) {
  return (
    <section className="appointments_content__container">
      <table className="appointments__table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Dosis</th>
            <th>Editar</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          <MedicamentosRows
            onEditMedicamento={onEditMedicamento}
            reload={reload}
          />
        </tbody>
      </table>
    </section>
  );
}

export default MedicamentosTable;
