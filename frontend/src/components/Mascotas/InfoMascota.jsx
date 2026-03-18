// src/components/Mascotas/InfoMascota.jsx
import React, { useEffect, useState } from "react";
import "../../css/Update.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  createMascotaRequest,
  updateMascotaRequest,
} from "../../api/Mascota.api";
import useClientes from "../../hooks/useClientes";
import useMedicamentos from "../../hooks/useMedicamentos";

function InfoMascota({ toggleModal, mascotaSeleccionada, onSuccess }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      identificacion: "",
      nombre: "",
      raza: "",
      edad: "",
      peso: "",
      cliente_id: "",
      medicamento_id: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const clientes = useClientes();
  const medicamentos = useMedicamentos();
  const isEdit = !!mascotaSeleccionada?.mascota_id;

  const toastStyle = {
    borderRadius: "10px",
    background: "var(--background-color-dark)",
    color: "var(--primary-color)",
  };

  useEffect(() => {
    if (mascotaSeleccionada) {
      reset({
        identificacion: mascotaSeleccionada.identificacion || "",
        nombre: mascotaSeleccionada.nombre || "",
        raza: mascotaSeleccionada.raza || "",
        edad: mascotaSeleccionada.edad || "",
        peso: mascotaSeleccionada.peso || "",
        cliente_id: mascotaSeleccionada.cliente_id || "",
        medicamento_id: mascotaSeleccionada.medicamento_id || "",
      });
    } else {
      reset({
        identificacion: "",
        nombre: "",
        raza: "",
        edad: "",
        peso: "",
        cliente_id: "",
        medicamento_id: "",
      });
    }
  }, [mascotaSeleccionada, reset]);

  const onSubmitMascota = handleSubmit(async (data) => {
    if (!data.identificacion?.trim()) {
      toast.error("Por favor ingresa la identificación", { style: toastStyle });
      return;
    }

    if (!data.nombre?.trim()) {
      toast.error("Por favor ingresa el nombre", { style: toastStyle });
      return;
    }

    if (!data.raza?.trim()) {
      toast.error("Por favor ingresa la raza", { style: toastStyle });
      return;
    }

    if (!data.edad) {
      toast.error("Por favor ingresa la edad", { style: toastStyle });
      return;
    }

    if (!data.peso) {
      toast.error("Por favor ingresa el peso", { style: toastStyle });
      return;
    }

    if (!data.cliente_id) {
      toast.error("Selecciona un cliente", { style: toastStyle });
      return;
    }

    if (!data.medicamento_id) {
      toast.error("Selecciona un medicamento", { style: toastStyle });
      return;
    }

    const payload = {
      ...data,
      edad: Number(data.edad),
      peso: Number(data.peso),
      cliente_id: Number(data.cliente_id),
      medicamento_id: Number(data.medicamento_id),
    };

    try {
      setLoading(true);

      if (isEdit) {
        await updateMascotaRequest(mascotaSeleccionada.mascota_id, payload);
        toast.success("Mascota actualizada correctamente", {
          style: toastStyle,
        });
      } else {
        await createMascotaRequest(payload);
        toast.success("Mascota creada correctamente", {
          style: toastStyle,
        });
      }

      toggleModal(false);
      onSuccess?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "Ocurrió un error al guardar la mascota",
        { style: toastStyle },
      );
    } finally {
      setLoading(false);
    }
  });

  return (
    <section>
      <section
        className="backdrop"
        onClick={() => toggleModal(false)}
      ></section>

      <section className="update">
        <form onSubmit={onSubmitMascota} className="update__form">
          <h1>{isEdit ? "Actualizar mascota" : "Crear mascota"}</h1>
          <br />
          <section className="update__inputs">
            <div>
              <p>Identificación</p>
              <input type="text" {...register("identificacion")} />
            </div>

            <div>
              <p>Nombre</p>
              <input type="text" {...register("nombre")} />
            </div>

            <div>
              <p>Raza</p>
              <input type="text" {...register("raza")} />
            </div>

            <div>
              <p>Edad</p>
              <input type="number" {...register("edad")} />
            </div>

            <div>
              <p>Peso</p>
              <input type="number" step="0.01" {...register("peso")} />
            </div>

            <div>
              <p>Cliente</p>
              <select {...register("cliente_id")}>
                <option value="">Selecciona un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.cliente_id} value={cliente.cliente_id}>
                    {cliente.nombres} {cliente.apellidos}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Medicamento</p>
              <select {...register("medicamento_id")}>
                <option value="">Selecciona un medicamento</option>
                {medicamentos.map((medicamento) => (
                  <option
                    key={medicamento.medicamento_id}
                    value={medicamento.medicamento_id}
                  >
                    {medicamento.nombre}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="update__button">
            <button type="submit" className="submit_button" disabled={loading}>
              {loading ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
            </button>

            <button
              type="button"
              className="submit_button"
              onClick={() => toggleModal(false)}
            >
              Cancelar
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}

export default InfoMascota;
