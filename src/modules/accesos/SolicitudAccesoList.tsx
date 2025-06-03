import { useEffect, useState } from "react";
import {
  obtenerSolicitudesAcceso,
  cambiarEstadoSolicitud,
} from "../../services/accesoApi";
import { Tabla } from "../../components/Tabla";
import { SolicitudAcceso } from "../../types/Acceso";

export default function SolicitudesAccesoList({
  recargar,
}: {
  recargar: boolean;
}) {
  const [solicitudes, setSolicitudes] = useState<SolicitudAcceso[]>([]);

  const cargarSolicitudes = async () => {
    const res = await obtenerSolicitudesAcceso();
    setSolicitudes(res.data);
  };

  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    await cambiarEstadoSolicitud(id, nuevoEstado);
    await cargarSolicitudes();
  };

  useEffect(() => {
    cargarSolicitudes();
  }, [recargar]);

  return (
    <div className="mt-4">
      <h5>Solicitudes Realizadas</h5>
      <Tabla
        data={solicitudes}
        columns={[
          { header: "Usuario", render: (s) => s.Usuario?.nombre },
          { header: "Accesos", render: (s) => s.AccesoDisponible?.nombre },
          {
            header: "Fecha",
            render: (s) =>
              s.fechaSolicitud
                ? new Date(s.fechaSolicitud).toLocaleString()
                : "",
          },
          {
            header: "Estado",
            render: (s) =>
              s.estado === "pendiente" ? (
                <>
                  <button
                    className="btn btn-outline-success btn-sm ms-2"
                    onClick={() => cambiarEstado(s.id, "aprobado")}
                  >
                    <i className="bi bi-hand-thumbs-up"></i> Aprobar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => cambiarEstado(s.id, "rechazado")}
                  >
                    <i className="bi bi-hand-thumbs-down"></i> Rechazar
                  </button>
                </>
              ) : (
                <span>{s.estado}</span>
              ),
          },
        ]}
      />
    </div>
  );
}
