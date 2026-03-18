import { Route, Routes } from "react-router-dom";
import Clientes from "../pages/Clientes";
import Medicamentos from "../pages/Medicamentos";
import Mascotas from "../pages/Mascotas";
import Reporte from "../pages/Reporte";
import Home from "../pages/home";

function RoutesPG() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/mascotas" element={<Mascotas />}/>
      <Route path="/medicamentos" element={<Medicamentos/>}/>
      <Route path="/reporte" element={<Reporte/>}/>
    </Routes>
  );
}

export default RoutesPG;
