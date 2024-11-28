import { Direccion } from "./direccion.model";

export interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
    numeroDeTelefono: string;
    direcciones: Direccion[];
    rol: RolUsuario;
  }

  export interface UsuarioRegistro {
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
    numeroDeTelefono: string;
    rol: number;
    direcciones: Direccion[];
  }
  
  export enum RolUsuario {
    Usuario = 'Usuario',
    Administrador = 'Administrador'
  }
  