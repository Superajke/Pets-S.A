import { useNavigate } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <section className="sidebar">
      <h1 className="sidebar__title">Pets S.A</h1>
      <ul>
        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/");
          }}
        >
          Inicio
        </li>
        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/clientes");
          }}
        >
          Clientes
        </li>

        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/mascotas");
          }}
        >
          Mascotas
        </li>

        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/medicamentos");
          }}
        >
          Medicamentos
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;
