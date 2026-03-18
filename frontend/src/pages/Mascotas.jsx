// src/pages/Mascotas.jsx
import { useState } from "react";
import "../css/Appointments.css";
import MascotasTable from "../components/Mascotas/MascotasTable";
import InfoMascota from "../components/Mascotas/InfoMascota";

function Mascotas() {
  const [openModal, setOpenModal] = useState(false);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [reload, setReload] = useState(false);

  const abrirCrearMascota = () => {
    setMascotaSeleccionada(null);
    setOpenModal(true);
  };

  const abrirEditarMascota = (mascota) => {
    setMascotaSeleccionada(mascota);
    setOpenModal(true);
  };

  const recargarMascotas = () => {
    setReload((prev) => !prev);
  };

  return (
    <section className="appointments">
      <section className="appointments__container">
        <header className="appointmentsTitle__container">
          <h2>Mascotas</h2>
        </header>

        <section className="appointments_button__container">
          <button className="button__appointment" onClick={abrirCrearMascota}>
            Nueva mascota
          </button>
        </section>

        <MascotasTable
          onEditMascota={abrirEditarMascota}
          onDeleteSuccess={recargarMascotas}
          reload={reload}
        />

        {openModal && (
          <InfoMascota
            toggleModal={setOpenModal}
            mascotaSeleccionada={mascotaSeleccionada}
            onSuccess={recargarMascotas}
          />
        )}
      </section>
    </section>
  );
}

export default Mascotas;
