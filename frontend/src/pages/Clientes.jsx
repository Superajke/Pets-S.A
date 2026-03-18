import { useState } from "react";
import "../css/Appointments.css";
import ClientesTable from "../components/Clientes/ClientesTable.jsx";
import InfoCliente from "../components/Clientes/InfoCliente.jsx";

function Clientes() {
  const [openModal, setOpenModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [reload, setReload] = useState(false);

  const abrirCrearCliente = () => {
    setClienteSeleccionado(null);
    setOpenModal(true);
  };

  const abrirEditarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setOpenModal(true);
  };

  const recargarClientes = () => {
    setReload((prev) => !prev);
  };

  return (
    <section className="appointments">
      <section className="appointments__container">
        <header className="appointmentsTitle__container">
          <h2>Clientes</h2>

          <section className="appointments_button__container">
            <button className="button__appointment"onClick={abrirCrearCliente}>Nuevo cliente</button>
          </section>

        </header>

        <ClientesTable onEditCliente={abrirEditarCliente} reload={reload} />

        {openModal && (
          <InfoCliente
            toggleModal={setOpenModal}
            clienteSeleccionado={clienteSeleccionado}
            onSuccess={recargarClientes}
          />
        )}
      </section>
    </section>
  );
}

export default Clientes;
