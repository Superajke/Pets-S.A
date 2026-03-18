// pages/Medicamentos.jsx
import { useState } from "react";
import "../css/Appointments.css";
import MedicamentosTable from "../components/Medicamentos/MedicamentosTable";
import InfoMedicamento from "../components/Medicamentos/InfoMedicamento";

function Medicamentos() {
  const [openModal, setOpenModal] = useState(false);
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);
  const [reload, setReload] = useState(false);

  const abrirCrearMedicamento = () => {
    setMedicamentoSeleccionado(null);
    setOpenModal(true);
  };

  const abrirEditarMedicamento = (medicamento) => {
    setMedicamentoSeleccionado(medicamento);
    setOpenModal(true);
  };

  const recargarMedicamentos = () => {
    setReload((prev) => !prev);
  };

  return (
    <section className="appointments">
      <section className="appointments__container">
        <header className="appointmentsTitle__container">
          <h2>Medicamentos</h2>
        </header>

        <section className="appointments_button__container">
          <button className="button__appointment" onClick={abrirCrearMedicamento}>
            Nuevo medicamento
          </button>
        </section>

        <MedicamentosTable
          onEditMedicamento={abrirEditarMedicamento}
          reload={reload}
        />

        {openModal && (
          <InfoMedicamento
            toggleModal={setOpenModal}
            medicamentoSeleccionado={medicamentoSeleccionado}
            onSuccess={recargarMedicamentos}
          />
        )}
      </section>
    </section>
  );
}

export default Medicamentos;
