import axios from "axios";
import { Usuario } from "../types/Usuario";

const API = "http://localhost:3001/api/usuarios";

export const obtenerUsuarios = () => axios.get<Usuario[]>(`${API}/listar`);

export const crearUsuario = (data: Omit<Usuario, "id">) =>
  axios.post(`${API}/crear`, data);

export const actualizarUsuario = (id: number, data: Omit<Usuario, "id">) =>
  axios.put(`${API}/actualizar/${id}`, data);

export function eliminarUsuario(id: number) {
  return axios.delete(`${API}/eliminar/${id}`);
}

export const cambiarEstado = (id: number, estado: string) =>
  axios.put(`${API}/cambiar-estado/${id}`, { estado });

export const actualizarActivo = (id: number, activo: boolean) =>
  axios.put(`${API}/actualizar-activo/${id}`, { activo });
