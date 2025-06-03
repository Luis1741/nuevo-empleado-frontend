import { useEffect, useState } from 'react';
import { eliminarUsuario, obtenerUsuarios, actualizarActivo, cambiarEstado } from '../../services/usuarioApi';
import { Usuario } from '../../types/Usuario';
import { toast } from 'react-toastify';
import { Tabla } from "../../components/Tabla";
import { ConfirmModal } from "../../components/ConfirmModal";

export default function UsuarioList({ recargar, onEditarUsuario }: { recargar: boolean, onEditarUsuario: (usuario: Usuario) => void }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  useEffect(() => {
    obtenerUsuarios().then(res => setUsuarios(res.data));
  }, [recargar]);

  const handleEliminarClick = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowModal(true);
  };

  const handleInactivar = async () => {
    if (!usuarioSeleccionado) return;
    setLoading(true);
    await actualizarActivo(usuarioSeleccionado.id, false);
    setUsuarios(usuarios.map(u => u.id === usuarioSeleccionado.id ? { ...u, activo: false } : u));
    setLoading(false);
    setShowModal(false);
    toast.info('Usuario inactivado correctamente');
  };

  const handleEliminar = async () => {
    if (!usuarioSeleccionado) return;
    setLoading(true);
    await eliminarUsuario(usuarioSeleccionado.id);
    setUsuarios(usuarios.filter(u => u.id !== usuarioSeleccionado.id));
    setLoading(false);
    setShowModal(false);
    toast.success('Usuario eliminado correctamente');
  };

    const handleCambiarEstado = async (id: number, nuevoEstado: string) => {
    console.log("🚀 ~ cambiarEstado ~ id:", id)
    console.log("🚀 ~ cambiarEstado ~ nuevoEstado:", nuevoEstado)
    setLoading(true);
    await cambiarEstado(id, nuevoEstado);
    const res = await obtenerUsuarios();
    setUsuarios(res.data);
    setLoading(false);
    toast.success(`Usuario ${nuevoEstado}`);
  };

  return (
    <div className="container mt-4">
      <h3>Lista de Usuarios</h3>
        <Tabla
          data={usuarios}
          columns={[
            { header: "Nombre", render: u => u.nombre },
            { header: "Correo", render: u => u.correo },
            { header: "Área", render: u => u.area },
            { header: "Rol", render: u => u.rol },
            { 
              header: "Estado", 
              render: u => 
                u.estado === "pendiente" ? (
                  <>
                    <button
                      className="btn btn-outline-success btn-sm ms-2"
                      onClick={() => handleCambiarEstado(u.id, "aprobado")}
                      disabled={loading}
                    >
                      <i className="bi bi-hand-thumbs-up"></i> Aprobar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => handleCambiarEstado(u.id, "rechazado")}
                      disabled={loading}
                    >
                      <i className="bi bi-hand-thumbs-down"></i> Rechazar
                    </button>
                  </>
                ) : (
                  <span>{u.estado}</span>
                )
            },
            { header: "Activo", render: u => u.activo ? "Si" : "No" },
            { header: "Editar", render: u => (
              <button className="btn btn-warning btn-sm" onClick={() => onEditarUsuario(u)} disabled={loading}>Editar</button>
            )},
            { header: "Eliminar", render: u => (
              <button className="btn btn-danger btn-sm" onClick={() => handleEliminarClick(u)} disabled={loading}>X</button>
            )},
          ]}
        />
        <ConfirmModal
          show={showModal && !!usuarioSeleccionado}
          title={`¿Qué deseas hacer con ${usuarioSeleccionado?.nombre}?`}
          message="¿Prefieres inactivar este usuario o eliminarlo permanentemente?"
          loading={loading}
          onCancel={() => setShowModal(false)}
          onSecondary={handleInactivar}
          onPrimary={handleEliminar}
          secondaryText="Inactivar"
          primaryText="Eliminar"
          secondaryColor="warning"
          primaryColor="danger"
        />
    </div>
  );
}
