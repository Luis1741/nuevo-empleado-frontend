import { useEffect, useState } from "react";
import {
  obtenerComputadoresDisponibles,
  asignarComputador,
  crearComputador,
  actualizarComputador,
  eliminarComputador,
} from "../../services/computadorApi";
import { obtenerUsuarios } from "../../services/usuarioApi";
import { Usuario } from "../../types/Usuario";
import { Computador } from "../../types/Computador";
import { ConfirmModal } from "../../components/ConfirmModal";

export default function AsignarComputadorForm({
  onAsignado,
}: {
  onAsignado?: () => void;
}) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [computadores, setComputadores] = useState<Computador[]>([]);
  const [usuarioId, setUsuarioId] = useState(0);
  const [computadorId, setComputadorId] = useState(0);
  const [nuevoComputador, setNuevoComputador] = useState("");
  const [nuevoNumeroSerie, setNuevoNumeroSerie] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [computadorEditarId, setComputadorEditarId] = useState<number | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    obtenerUsuarios().then((res) => setUsuarios(res.data));
    obtenerComputadoresDisponibles().then((res) => setComputadores(res.data));
  }, []);

  const handleAgregarCompuatador = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoComputador.trim() && nuevoNumeroSerie.trim()) {
      try {
        await crearComputador({
          nombre: nuevoComputador.trim(),
          numeroSerie: nuevoNumeroSerie.trim(),
        });
        const res = await obtenerComputadoresDisponibles();
        setComputadores(res.data);
        setNuevoComputador("");
        setNuevoNumeroSerie("");
      } catch (err) {
        setMensaje("Error al crear computador ❌");
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await asignarComputador({ usuarioId, computadorId });
      setMensaje("Computador asignado ✅");
      setUsuarioId(0);
      setComputadorId(0);
      onAsignado?.();
    } catch (err) {
      setMensaje("Error al asignar ❌");
    }
  };

  const handleEliminarComputador = () => {
    if (!computadorEditarId) return;
    setShowModal(true);
  };

  const confirmarEliminarComputador = async () => {
    if (!computadorEditarId) return;
    try {
      await eliminarComputador(computadorEditarId);
      setMensaje("Computador eliminado ✅");
      const res = await obtenerComputadoresDisponibles();
      setComputadores(res.data);
      setComputadorEditarId(null);
      setNuevoComputador("");
      setNuevoNumeroSerie("");
    } catch (err) {
      setMensaje("Error al eliminar computador ❌");
    }
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card p-4 mt-4">
        <h5>Crear Nuevo Computador</h5>
        <div className="d-flex mb-2">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Nombre del computador"
            value={nuevoComputador}
            onChange={(e) => setNuevoComputador(e.target.value)}
          />
          <input
            type="text"
            className="form-control me-2"
            placeholder="Número de serie"
            value={nuevoNumeroSerie}
            onChange={(e) => setNuevoNumeroSerie(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAgregarCompuatador}
            disabled={!!computadorEditarId}
          >
            Agregar
          </button>
        </div>
        <br />
        <h5>Actualizar o Eliminar Computador</h5>
        <div className="mb-2">
          <select
            className="form-select"
            value={computadorEditarId ?? ""}
            onChange={(e) => {
              const id = Number(e.target.value);
              setComputadorEditarId(id);
              const comp: Computador | undefined = computadores.find(
                (c: any) => c.id === id,
              );
              if (comp) {
                setNuevoComputador(comp.nombre);
                setNuevoNumeroSerie(comp.numeroSerie);
              }
            }}
          >
            <option value="">Selecciona un computador</option>
            {computadores.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.nombre} - ({c.numeroSerie})
              </option>
            ))}
          </select>
        </div>

        {computadorEditarId && (
          <div className="d-flex mb-2">
            <button
              className="btn btn-warning btn-sm me-2"
              type="button"
              onClick={async () => {
                try {
                  await actualizarComputador(computadorEditarId, {
                    nombre: nuevoComputador,
                    numeroSerie: nuevoNumeroSerie,
                  });
                  setMensaje("Computador actualizado ✅");
                  const res = await obtenerComputadoresDisponibles();
                  setComputadores(res.data);
                  setComputadorEditarId(null);
                  setNuevoComputador("");
                  setNuevoNumeroSerie("");
                } catch (err) {
                  setMensaje("Error al actualizar computador ❌");
                }
              }}
            >
              Actualizar computador
            </button>
            <button
              className="btn btn-danger btn-sm"
              type="button"
              onClick={handleEliminarComputador}
            >
              Eliminar computador
            </button>
          </div>
        )}
        <br />
        <h3>Asignar Computador</h3>
        <div>
          <label>Usuario:</label>
          <select
            className="form-select"
            value={usuarioId}
            onChange={(e) => setUsuarioId(Number(e.target.value))}
            required
          >
            <option value="">Seleccionar usuario</option>
            {usuarios.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Computador:</label>
          <select
            className="form-select"
            value={computadorId}
            onChange={(e) => setComputadorId(Number(e.target.value))}
            required
          >
            <option value="">Seleccionar equipo</option>
            {computadores.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.nombre} - ({c.numeroSerie})
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary mt-2" type="submit">
          Asignar
        </button>
        {mensaje && <div className="alert alert-info mt-2">{mensaje}</div>}
      </form>

      <ConfirmModal
        show={showModal}
        title="Eliminar computador"
        message={`¿Seguro que deseas eliminar este computador?`}
        loading={false}
        onCancel={() => setShowModal(false)}
        onPrimary={confirmarEliminarComputador}
        primaryText="Eliminar"
        primaryColor="danger"
      />
    </>
  );
}
