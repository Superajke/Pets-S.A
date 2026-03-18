// src/components/Mascotas/DeleteMascota.jsx
import React from "react";
import { toast } from "react-hot-toast";
import { deleteMascotaRequest } from "../../api/Mascota.api";

function DeleteMascota({ mascota_id, onSuccess }) {
  const toastStyle = {
    borderRadius: "10px",
    background: "var(--background-color-dark)",
    color: "var(--primary-color)",
  };

  const handleDelete = async () => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta mascota?"
    );

    if (!confirmar) return;

    try {
      await deleteMascotaRequest(mascota_id);
      toast.success("Mascota eliminada correctamente", {
        style: toastStyle,
      });
      onSuccess?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error al eliminar la mascota",
        { style: toastStyle }
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

export default DeleteMascota;
