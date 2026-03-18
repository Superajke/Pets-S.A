import React from "react";
import { toast } from "react-hot-toast";
import { deleteMedicamentoRequest } from "../../api/Medicamento.api";

function DeleteMedicamento({ medicamento_id, onSuccess }) {
  const toastStyle = {
    borderRadius: "10px",
    background: "var(--background-color-dark)",
    color: "var(--primary-color)",
  };

  const handleDelete = async () => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este medicamento?"
    );

    if (!confirmar) return;

    try {
      await deleteMedicamentoRequest(medicamento_id);
      toast.success("Medicamento eliminado correctamente", {
        style: toastStyle,
      });
      onSuccess?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error al eliminar el medicamento",
        {
          style: toastStyle,
        }
      );
      console.error(error);
    }
  };

  return (
    <a onClick={handleDelete} style={{ cursor: "pointer" }}>
      ❌
    </a>
  );
}

export default DeleteMedicamento;
