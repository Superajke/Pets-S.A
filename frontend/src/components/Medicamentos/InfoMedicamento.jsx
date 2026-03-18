// components/Medicamentos/InfoMedicamento.jsx
import React, { useEffect, useState } from "react";
import "../../css/Update.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  createMedicamentoRequest,
  updateMedicamentoRequest,
} from "../../api/Medicamento.api";

function InfoMedicamento({ toggleModal, medicamentoSeleccionado, onSuccess }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      dosis: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const isEdit = !!medicamentoSeleccionado?.medicamento_id;

  const toastStyle = {
    borderRadius: "10px",
    background: "var(--background-color-dark)",
    color: "var(--primary-color)",
  };

  useEffect(() => {
    if (medicamentoSeleccionado) {
      reset({
        nombre: medicamentoSeleccionado.nombre || "",
        descripcion: medicamentoSeleccionado.descripcion || "",
        dosis: medicamentoSeleccionado.dosis || "",
      });
    } else {
      reset({
        nombre: "",
        descripcion: "",
        dosis: "",
      });
    }
  }, [medicamentoSeleccionado, reset]);

  const onSubmitMedicamento = handleSubmit(async (data) => {
    if (!data.nombre?.trim()) {
      toast.error("Por favor ingresa el nombre", { style: toastStyle });
      return;
    }

    if (!data.descripcion?.trim()) {
      toast.error("Por favor ingresa la descripción", { style: toastStyle });
      return;
    }

    if (!data.dosis?.trim()) {
      toast.error("Por favor ingresa la dosis", { style: toastStyle });
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await updateMedicamentoRequest(
          medicamentoSeleccionado.medicamento_id,
          data,
        );
        toast.success("Medicamento actualizado correctamente", {
          style: toastStyle,
        });
      } else {
        await createMedicamentoRequest(data);
        toast.success("Medicamento creado correctamente", {
          style: toastStyle,
        });
      }

      toggleModal(false);
      onSuccess?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "Ocurrió un error al guardar el medicamento",
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
        <form onSubmit={onSubmitMedicamento} className="update__form">
          <h1>{isEdit ? "Actualizar medicamento" : "Crear medicamento"}</h1>
          <br />
          <section className="update__inputs">
            <div>
              <p>Nombre</p>
              <input type="text" {...register("nombre")} />
            </div>

            <div>
              <p>Descripción</p>
              <input type="text" {...register("descripcion")} />
            </div>

            <div>
              <p>Dosis</p>
              <input type="text" {...register("dosis")} />
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

export default InfoMedicamento;
