import { useEffect, useState } from "react";
import { obtenerHistorialAsignacionesList } from "../../services/computadorApi";
import { Tabla } from "../../components/Tabla";
import { Asignacion } from "../../types/Computador"; // <-- importa la interfaz

export default function HistorialAsignacionesList({
  recargar,
}: {
  recargar: boolean;
}) {
  const [historial, setHistorial] = useState<Asignacion[]>([]); // <-- tipa el estado

  useEffect(() => {
    obtenerHistorialAsignacionesList().then((res) => setHistorial(res.data));
  }, [recargar]);

  return (
    <div className="mt-4">
      <h4>Historial de Asignaciones</h4>
      <Tabla
        data={historial}
        columns={[
          { header: "Usuario", render: (a) => a.Usuario?.nombre },
          { header: "Computador", render: (a) => a.Computador?.nombre },
          {
            header: "Número de Serie",
            render: (a) => a.Computador?.numeroSerie,
          },
          {
            header: "Fecha de Entrega",
            render: (a) => new Date(a.fechaEntrega).toLocaleDateString(),
          },
        ]}
      />
    </div>
  );
}
