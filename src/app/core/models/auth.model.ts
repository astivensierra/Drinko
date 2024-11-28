import { Usuario } from "./usuario.model";

export interface InicioDeSesionDTO {
    correo: string;
    clave: string;
  }
  
  export interface AuthResponse {
    usuarioId: string,
    nombreCompleto: string,
    rol: string,
    correo: string,
    token: string;
  }
  