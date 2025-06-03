import { useState } from "react";
import UsuarioList from "../modules/usuarios/UsuarioList";
import UsuarioForm from "../modules/usuarios/UsuarioForm";
import { Usuario } from "../types/Usuario";

const UsuariosPage = () => {
  const [recargar, setRecargar] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);

  const refrescar = () => setRecargar(!recargar);

  return (
    <div className="container mt-4">
      <h2>Gestión de Usuarios</h2>
      <UsuarioForm
        onUsuarioCreado={refrescar}
        usuarioEditar={usuarioEditar}
        onLimpiarEdicion={() => setUsuarioEditar(null)}
      />
      <UsuarioList
        recargar={recargar}
        onEditarUsuario={setUsuarioEditar}
      />
    </div>
  );
};

export default UsuariosPage;