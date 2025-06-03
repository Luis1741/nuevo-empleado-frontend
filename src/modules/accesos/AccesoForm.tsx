import { useEffect, useState } from "react";
import { crearSolicitudAcceso, obtenerAccesos, crearAcceso, actualizarAcceso, eliminarAcceso } from "../../services/accesoApi";
import { obtenerUsuarios } from "../../services/usuarioApi";
import { Usuario } from "../../types/Usuario";
import { Acceso } from "../../types/Acceso";
import { ConfirmModal } from "../../components/ConfirmModal";

export default function AccesoForm({ onCreada }: { onCreada?: () => void }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioId, setUsuarioId] = useState<number>(0);
  const [mensaje, setMensaje] = useState("");
  const [accesosDisponibles, setAccesosDisponibles] = useState<Acceso[]>([]);
  const [accesosSeleccionados, setAccesosSeleccionados] = useState<number[]>([]);
  const [nuevoAcceso, setNuevoAcceso] = useState("");
  const [editAccesoId, setEditAccesoId] = useState<number | null>(null);
  const [editAccesoNombre, setEditAccesoNombre] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [accesoAEliminar, setAccesoAEliminar] = useState<Acceso | null>(null);

  useEffect(() => {
    obtenerUsuarios().then(res => setUsuarios(res.data));
    obtenerAccesos().then(res => setAccesosDisponibles(res.data));
  }, []);

  const handleAgregarAcceso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoAcceso.trim()) {
      try {
        await crearAcceso({ nombre: nuevoAcceso.trim() });
        const res = await obtenerAccesos();
        setAccesosDisponibles(res.data);
        setNuevoAcceso("");
      } catch (err) {
        setMensaje("Error al crear acceso ❌");
        console.error(err);
      }
    }
  };

  const handleEditarAcceso = (id: number, nombre: string) => {
    setEditAccesoId(id);
    setEditAccesoNombre(nombre);
  };

  const handleGuardarEditarAcceso = async (id: number) => {
    try {
      await actualizarAcceso(id, { nombre: editAccesoNombre });
      const res = await obtenerAccesos();
      setAccesosDisponibles(res.data);
      setEditAccesoId(null);
      setEditAccesoNombre("");
      setMensaje("Acceso actualizado ✅");
    } catch (err) {
      setMensaje("Error al actualizar acceso ❌");
      console.error(err);
    }
  };

  const handleEliminarAcceso = (acceso: Acceso) => {
    setAccesoAEliminar(acceso);
    setShowModal(true);
  };

  const confirmarEliminarAcceso = async () => {
  if (!accesoAEliminar) return;
  try {
    await eliminarAcceso(accesoAEliminar.id);
    const res = await obtenerAccesos();
    setAccesosDisponibles(res.data);
    setEditAccesoId(null);
    setEditAccesoNombre("");
    setMensaje("Acceso eliminado ✅");
  } catch (err) {
    setMensaje("Error al eliminar acceso ❌");
    console.error(err);
  }
  setShowModal(false);
  setAccesoAEliminar(null);
};



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      usuarioId,
      accesos: accesosSeleccionados.map(String),
    };
    try {
      await crearSolicitudAcceso(payload);
      setMensaje("Solicitud enviada ✅");
      setUsuarioId(0);
      setAccesosSeleccionados([]);
      onCreada?.();
    } catch (err) {
      console.error(err);
      setMensaje("Error al enviar solicitud ❌");
    }
  };

  return (
      <>
    <form onSubmit={handleSubmit} className="card p-4 mt-4">
      <h5>Crear Nuevo Acceso</h5>
      <div className="d-flex mb-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nuevo acceso"
          value={nuevoAcceso}
          onChange={e => setNuevoAcceso(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={handleAgregarAcceso}>
          Agregar
        </button>
      </div>
      <br />
      <h5>Solicitar Accesos</h5>
      <div className="mb-2">
        <label>Usuario</label>
        <select className="form-select" value={usuarioId} onChange={e => setUsuarioId(Number(e.target.value))} required>
          <option value="">Seleccione</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>
              {u.nombre} ({u.correo})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
  <br />
  <label>
    Listado de Accesos: <b>(Si deseas eliminar o actualizar el acceso de doble clic sobre el nombre)</b>
  </label>
  <br />
  <br />
  <div className="row">
    {accesosDisponibles.map(acceso => (
      <div key={acceso.id} className="col-md-4 mb-2">
        <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id={`acceso-${acceso.id}`}
                value={acceso.id}
                checked={accesosSeleccionados.includes(acceso.id)}
                onChange={e => {
                  const checked = e.target.checked;
                  const id = parseInt(e.target.value);
                  setAccesosSeleccionados(prev =>
                    checked ? [...prev, id] : prev.filter(a => a !== id)
                  );
                }}
              />
              {editAccesoId === acceso.id ? (
                <>
                  <input
                    className="form-control form-control-sm ms-2"
                    style={{ width: 180 }}
                    value={editAccesoNombre}
                    onChange={e => setEditAccesoNombre(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") handleGuardarEditarAcceso(acceso.id);
                      if (e.key === "Escape") setEditAccesoId(null);
                    }}
                    autoFocus
                  />
                  <button
                    className="btn btn-success btn-sm ms-2"
                    type="button"
                    onClick={() => handleGuardarEditarAcceso(acceso.id)}
                    title="Guardar"
                  >
                    <i className="bi bi-floppy2"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    type="button"
                    onClick={() => handleEliminarAcceso(acceso)}
                    title="Eliminar"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="btn btn-secondary btn-sm ms-1"
                    type="button"
                    onClick={() => setEditAccesoId(null)}
                    title="Cancelar"
                  >
                   <i className="bi bi-x"></i>
                  </button>
                </>
              ) : (
                <label
                  className="form-check-label ms-2"
                  htmlFor={`acceso-${acceso.id}`}
                  style={{ cursor: "pointer", userSelect: "none" }}
                  onDoubleClick={() => handleEditarAcceso(acceso.id, acceso.nombre)}
                  title="Doble clic para editar"
                >
                  {acceso.nombre}
                </label>
              )}
        </div>
      </div>
    ))}
  </div>
</div>
      <button className="btn btn-primary mt-2">Enviar Solicitud</button>
      {mensaje && <div className="alert alert-info mt-2">{mensaje}</div>}
    </form>
        <ConfirmModal
      show={showModal}
      title="Eliminar acceso"
      message={`¿Seguro que deseas eliminar el acceso "${accesoAEliminar?.nombre}"?`}
      loading={false}
      onCancel={() => {
        setShowModal(false);
        setAccesoAEliminar(null);
      }}
      onPrimary={confirmarEliminarAcceso}
      primaryText="Eliminar"
      primaryColor="danger"
    />
  </>
  );
  
}