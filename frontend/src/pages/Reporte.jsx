// src/pages/Reporte.jsx
import "../css/Appointments.css";
import useReporte from "../hooks/useReporte";

function Reporte() {
  const reporte = useReporte();

  return (
    <section className="appointments">
      <section className="appointments__container">
        <header className="appointmentsTitle__container">
          <h2>Reporte</h2>
        </header>

        <section className="appointments_content__container">
          <table className="appointments__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Teléfono</th>
                <th>Mascota</th>
                <th>Raza</th>
                <th>Medicamento</th>
                <th>Dosis</th>
              </tr>
            </thead>
            <tbody>
              {reporte.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.cliente}</td>
                  <td>{item.telefono}</td>
                  <td>{item.mascota}</td>
                  <td>{item.raza}</td>
                  <td>{item.medicamento}</td>
                  <td>{item.dosis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </section>
  );
}

export default Reporte;
