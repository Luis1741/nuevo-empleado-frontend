export interface Acceso {
  id: number;
  nombre: string;
}

export interface SolicitudAcceso {
  id: number;
  Usuario?: { nombre: string };
  AccesoDisponible?: { nombre: string };
  fechaSolicitud?: string;
  estado: string;
}
