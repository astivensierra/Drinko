import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { UsuarioService } from '../../../core/services/usuario.service';
import { Usuario, RolUsuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'acciones', 'clave'];
  dataSource: Usuario[] = [];

  nuevoUsuario: Usuario = {
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    numeroDeTelefono: '',
    direcciones: [],
    rol: RolUsuario.Usuario
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // Cargar los usuarios desde el servicio
  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (usuarios) => {
        this.dataSource = usuarios;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  // Crear un nuevo usuario
  crearUsuario(): void {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.correo && this.nuevoUsuario.clave) {
      this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(
        () => {
          alert('Usuario creado');
          this.obtenerUsuarios(); // Recargar los usuarios
          this.limpiarFormulario(); // Limpiar formulario después de crear
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
        }
      );
    } else {
      alert('Por favor complete todos los campos del formulario');
    }
  }

  // Limpiar el formulario después de crear
  limpiarFormulario(): void {
    this.nuevoUsuario = {
      id: '',
      nombre: '',
      apellido: '',
      correo: '',
      clave: '',
      numeroDeTelefono: '',
      direcciones: [],
      rol: RolUsuario.Usuario
    };
  }

 // Actualizar un usuario
actualizarUsuario(id: string, usuario: Usuario): void {
  const numericId = Number(id);
  this.usuarioService.actualizarUsuario(numericId, usuario).subscribe(
    () => {
      alert('Usuario actualizado');
      this.obtenerUsuarios(); // Recargar los usuarios
    },
    (error) => {
      console.error('Error al actualizar el usuario:', error);
    }
  );
}

// Eliminar un usuario
eliminarUsuario(id: string): void {
  const numericId = Number(id);
  this.usuarioService.eliminarUsuario(numericId).subscribe(
    () => {
      alert('Usuario eliminado');
      this.obtenerUsuarios(); // Recargar los usuarios
    },
    (error) => {
      console.error('Error al eliminar el usuario:', error);
    }
  );
}
}
