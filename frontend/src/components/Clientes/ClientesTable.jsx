import ClientesRows from "./ClientesRows";

function ClientesTable({ onEditCliente, reload }) {
  return (
    <section className="appointments_content__container">
      <table className="appointments__table">
        <thead>
          <tr>
            <th>#</th>
            <th>Cedula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Direccion</th>
            <th>Teléfono</th>
            <th>Editar</th>
            <th>Borrar</th>
          </tr>
        </thead>

        <tbody>
          <ClientesRows onEditCliente={onEditCliente} reload={reload} />
        </tbody>
      </table>
    </section>
  );
}

export default ClientesTable;
