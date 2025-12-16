  import { Routes, Route } from "react-router-dom";
  import Home from "../views/Home";
  import Contacto from "../views/Contacto";

  function AppRoutes() {
    return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/contacto" element={<Contacto />} />
      
      </Routes>
    );
  }

  export default AppRoutes;