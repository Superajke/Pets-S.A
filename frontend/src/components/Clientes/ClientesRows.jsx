import React from "react";
import useClientes from "../../hooks/useClientes";
import DeleteCliente from "./DeleteCliente";
import FuncionCliente from "./FuncionCliente";

function ClientesRows({ onEditCliente, reload }) {
  const clientes = useClientes(reload);

  return (
    <>
      {clientes.map((cliente) => (
        <tr key={cliente.cliente_id}>
          <td>{cliente.cliente_id}</td>
          <td>{cliente.cedula}</td>
          <td>{cliente.nombres}</td>
          <td>{cliente.apellidos}</td>
          <td>{cliente.direccion}</td>
          <td>{cliente.telefono}</td>
          <td>
            <FuncionCliente
              cliente={cliente}
              onEditCliente={onEditCliente}
            />
          </td>
          <td>
            <DeleteCliente cliente_id={cliente.cliente_id} />
          </td>
        </tr>
      ))}
    </>
  );
}

export default ClientesRows;
