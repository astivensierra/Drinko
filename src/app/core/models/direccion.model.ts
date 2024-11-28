export interface Direccion {
    id: string;
    linea1: string;
    linea2: string;
    ciudad: string;
    departamento: string;
    codigoPostal: number;
}

export interface DireccionCommon {
    linea1: string;
    linea2: string;
    ciudad: string;
    departamento: string;
    codigoPostal: number;
}

export interface DireccionCommand {
    usuarioId: string;
    direccion: DireccionCommon;
}
  