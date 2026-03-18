import "../css/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="home">
      <section className="home__container">
        <h1 className="home__title">
          ¡Bienvenido! Esperamos estés teniendo un buen día
        </h1>
        <p className="home__subtitle">Base de datos de la tienda</p>
        <p className="home__text">
          Puedes generar un reporte con el siguiente botón
        </p>

        <section className="appointments_button__container">
          <button
            className="button__appointment"
            onClick={() => navigate("/reporte")}
          >
            Generar Reporte
          </button>
        </section>
      </section>
    </section>
  );
}

export default Home;
