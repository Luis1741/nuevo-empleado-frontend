import { useState, useEffect } from "react";
import { crearUsuario, actualizarUsuario } from "../../services/usuarioApi";
import { Usuario } from "../../types/Usuario";

interface Props {
  onUsuarioCreado?: () => void;
  usuarioEditar?: Usuario | null;
  onLimpiarEdicion?: () => void;
}

const UsuarioForm = ({
  onUsuarioCreado,
  usuarioEditar,
  onLimpiarEdicion,
}: Props) => {
  const [form, setForm] = useState<Omit<Usuario, "id" | "estado">>({
    nombre: "",
    correo: "",
    area: "",
    rol: "",
    activo: true,
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (usuarioEditar) {
      const { id, ...rest } = usuarioEditar;
      setForm(rest);
    } else {
      setForm({
        nombre: "",
        correo: "",
        area: "",
        rol: "",
        activo: true,
      });
    }
  }, [usuarioEditar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearUsuario({ ...form, estado: "pendiente" });
      setMensaje("Usuario creado correctamente ✅");
      setForm({ nombre: "", correo: "", area: "", rol: "", activo: true });
      onUsuarioCreado?.();
    } catch (error) {
      setMensaje("Error al crear el usuario ❌");
    }
  };

  const handleActualizar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioEditar) return;
    try {
      await actualizarUsuario(usuarioEditar.id, form);
      setMensaje("Usuario actualizado correctamente ✅");
      setForm({ nombre: "", correo: "", area: "", rol: "", activo: true });
      onUsuarioCreado?.();
      onLimpiarEdicion?.();
    } catch (error) {
      setMensaje("Error al actualizar el usuario ❌");
    }
  };

  return (
    <div className="card p-4 mt-4 was-validated">
      <h4>Registrar Nuevo Usuario</h4>
      <form onSubmit={usuarioEditar ? handleActualizar : handleSubmit}>
        <div className="mb-2">
          <label>Nombre</label>
          <input
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            minLength={1}
            maxLength={50}
          />
          <div className="invalid-feedback">
            El nombre debe tener entre 3 y 50 caracteres.
          </div>
        </div>
        <div className="mb-2">
          <label>Correo</label>
          <input
            className="form-control"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          />
          <div className="invalid-feedback">Ingresa un correo válido.</div>
        </div>
        <div className="mb-2">
          <label>Área</label>
          <input
            className="form-control"
            name="area"
            value={form.area}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={30}
          />
          <div className="invalid-feedback">
            El área debe tener entre 2 y 30 caracteres.
          </div>
        </div>
        <div className="mb-2">
          <label>Rol</label>
          <input
            className="form-control"
            name="rol"
            value={form.rol}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={30}
          />
          <div className="invalid-feedback">
            El rol debe tener entre 2 y 30 caracteres.
          </div>
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          {usuarioEditar ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
        {usuarioEditar && (
          <button
            type="button"
            className="btn btn-secondary mt-2 ms-2"
            onClick={onLimpiarEdicion}
          >
            Cancelar
          </button>
        )}
        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </form>
    </div>
  );
};

export default UsuarioForm;
