export interface Asignacion {
  Usuario?: { nombre: string };
  Computador?: { nombre: string; numeroSerie: string };
  fechaEntrega: string;
}

export interface Computador {
  nombre: string;
  numeroSerie: string;
}
