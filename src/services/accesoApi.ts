import axios from "axios";

const API = "http://localhost:3001/api/solicitud-accesos";

export const obtenerAccesos = () => axios.get(`${API}/listar`);
export const crearAcceso = (data: { nombre: string }) => axios.post(`${API}/crear`, data);
export const actualizarAcceso = (id: number, data: { nombre: string }) => axios.put(`${API}/actualizar/${id}`, data);
export function eliminarAcceso(id: number) {
  return axios.delete(`${API}/eliminar/${id}`);
}
export const crearSolicitudAcceso = (data: {
  usuarioId: number;
  accesos: string[];
}) => axios.post(`${API}/crear-solicitud`, data);
export const obtenerSolicitudesAcceso = () => axios.get(`${API}/listar-solicitud`);
export const cambiarEstadoSolicitud = (id: number, estado: string) => axios.put(`${API}/cambiar-estado/${id}`, { estado });
