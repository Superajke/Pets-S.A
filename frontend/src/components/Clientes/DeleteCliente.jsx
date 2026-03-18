import axios from "../../api/axios";
import { deleteClientRequest } from "../../api/Client.api";

const DeleteCliente = ({ cliente_id }) => {
  const Delete = async () => {
    try {
      await deleteClientRequest(cliente_id, axios);
      window.location.reload();
    } catch (error) {
      console.error("Error when deleting session:", error);
    }
  };

  return (
    <a onClick={Delete} style={{ cursor: "pointer" }}>
      ❌
    </a>
  );
};

export default DeleteCliente;
