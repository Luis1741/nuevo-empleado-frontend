import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsuariosPage from "./pages/UsuariosPage";
import AccesosPage from "./pages/AccesosPage";
import ComputadorPage from "./pages/ComputadorPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accesos" element={<AccesosPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/computadores" element={<ComputadorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
