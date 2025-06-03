// src/pages/AsignacionComputadorPage.tsx
import AsignacionComputador from "../modules/computadores/AsignarComputadorForm";
import { useState } from "react";
import HistorialAsignacionesList from "../modules/computadores/HistorialAsignacionesList";

export default function ComputadorPage() {
  const [recargar, setRecargar] = useState(false);
    const actualizar = () => setRecargar(!recargar);
  return (
    <div className="container mt-4">
      <h2>Asignación de Computadores</h2>
      <AsignacionComputador onAsignado={actualizar}/>
      <HistorialAsignacionesList recargar={recargar} />
    </div>
  );
}
