import React, { useEffect, useState } from "react";
import "../../css/Update.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createClientRequest, updateClientRequest } from "../../api/Client.api";

function InfoCliente({ toggleModal, clienteSeleccionado, onSuccess }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      cedula: "",
      nombres: "",
      apellidos: "",
      direccion: "",
      telefono: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const isEdit = !!clienteSeleccionado?.cliente_id;

  const toastStyle = {
    borderRadius: "10px",
    background: "var(--background-color-dark)",
    color: "var(--primary-color)",
  };

  useEffect(() => {
    if (clienteSeleccionado) {
      reset({
        cedula: clienteSeleccionado.cedula || "",
        nombres: clienteSeleccionado.nombres || "",
        apellidos: clienteSeleccionado.apellidos || "",
        direccion: clienteSeleccionado.direccion || "",
        telefono: clienteSeleccionado.telefono || "",
      });
    } else {
      reset({
        cedula: "",
        nombres: "",
        apellidos: "",
        direccion: "",
        telefono: "",
      });
    }
  }, [clienteSeleccionado, reset]);

  const onSubmitCliente = handleSubmit(async (data) => {
    if (!data.cedula?.trim()) {
      toast.error("Por favor ingresa la cédula", { style: toastStyle });
      return;
    }

    if (!data.nombres?.trim()) {
      toast.error("Por favor ingresa los nombres", { style: toastStyle });
      return;
    }

    if (!data.apellidos?.trim()) {
      toast.error("Por favor ingresa los apellidos", { style: toastStyle });
      return;
    }

    if (!data.direccion?.trim()) {
      toast.error("Por favor ingresa la dirección", { style: toastStyle });
      return;
    }

    if (!data.telefono?.trim()) {
      toast.error("Por favor ingresa el teléfono", { style: toastStyle });
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await updateClientRequest(clienteSeleccionado.cliente_id, data);
        toast.success("Cliente actualizado correctamente", {
          style: toastStyle,
        });
      } else {
        await createClientRequest(data);
        toast.success("Cliente creado correctamente", {
          style: toastStyle,
        });
      }

      toggleModal(false);
      onSuccess?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "Ocurrió un error al guardar el cliente",
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
        <form onSubmit={onSubmitCliente} className="update__form">
          <h1>{isEdit ? "Actualizar cliente" : "Crear cliente"}</h1>
          <br />
          <section className="update__inputs">
            <div>
              <p>Cédula</p>
              <input type="text" {...register("cedula")} />
            </div>

            <div>
              <p>Nombres</p>
              <input type="text" {...register("nombres")} />
            </div>

            <div>
              <p>Apellidos</p>
              <input type="text" {...register("apellidos")} />
            </div>

            <div>
              <p>Dirección</p>
              <input type="text" {...register("direccion")} />
            </div>

            <div>
              <p>Teléfono</p>
              <input type="text" {...register("telefono")} />
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

export default InfoCliente;
