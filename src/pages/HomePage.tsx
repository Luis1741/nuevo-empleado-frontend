import { useNavigate } from "react-router-dom";
import { ActionCard } from "../components/ActionCard";
import ListaSolicitudesAcceso from "../modules/accesos/SolicitudAccesoList";
import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function HomePage() {
 const [recargar, setRecargar] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gestión de Ingresos y Recursos</h2>
      <div className="row mb-4">
        <div className="col-md-4">
          <ActionCard
            iconClass="bi bi-person"
            title="Creación de Usuario"
            description="Registrar a una nueva persona en el equipo."
            buttonText="Registrar nuevo ingreso"
            onClick={() => navigate("/usuarios")}
          />
        </div>
        <div className="col-md-4">
          <ActionCard
            iconClass="bi bi-key-fill"
            title="Solicitud de Accesos"
            description="Solicitar permisos para un nuevo miembro del equipo."
            buttonText="Solicitar acceso"
            onClick={() => navigate("/accesos")}
          />
        </div>
        <div className="col-md-4">
          <ActionCard
            iconClass="bi bi-laptop"
            title="Asignación de Computadores"
            description="Asignar un equipo portátil a un nuevo ingreso."
            buttonText="Asignar computador"
            onClick={() => navigate("/computadores")}
          />
        </div>
      </div>
      <ListaSolicitudesAcceso recargar={recargar} />
    </div>
  );
}