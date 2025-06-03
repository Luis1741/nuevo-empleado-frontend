import AccesoForm from "../modules/accesos/AccesoForm";
import ListaSolicitudesAcceso from "../modules/accesos/SolicitudAccesoList";
import { useState } from "react";

export default function AccesosPage() {
  const [recargar, setRecargar] = useState(false);
  const actualizar = () => setRecargar(!recargar);

  return (
    <div className="container mt-4">
      <h3>Módulo de Accesos</h3>
      <AccesoForm onCreada={actualizar} />
      <ListaSolicitudesAcceso recargar={recargar} />
    </div>
  );
}
