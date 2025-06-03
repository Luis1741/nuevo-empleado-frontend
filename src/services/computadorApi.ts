import axios from "axios";

const API = "http://localhost:3001/api/asignacion-computadores";

export const obtenerComputadoresDisponibles = () => axios.get(`${API}/listar`);
export const crearComputador = (data: {
  nombre: string;
  numeroSerie: string;
}) => axios.post(`${API}/crear`, data);
export const actualizarComputador = (
  id: number,
  data: { nombre: string; numeroSerie: string },
) => axios.put(`${API}/actualizar/${id}`, data);
export function eliminarComputador(id: number) {
  return axios.delete(`${API}/eliminar/${id}`);
}
export const asignarComputador = (data: {
  usuarioId: number;
  computadorId: number;
}) => axios.post(`${API}/asignar`, data);
export const obtenerHistorialAsignacionesList = () =>
  axios.get(`${API}/historial`);
