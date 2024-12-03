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
  mostrarFormularioEdicion: boolean = false;
  usuarioEditado: Usuario = {
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    numeroDeTelefono: '',
    direcciones: [],
    rol: RolUsuario.Usuario
  };

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
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  // Crear un nuevo usuario
  crearUsuario(): void {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.correo && this.nuevoUsuario.clave) {
      this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(
        () => {
          alert('Usuario creado');
          this.obtenerUsuarios();
          this.limpiarFormulario();
        },
        (error) => {
          console.error('Error al crear usuario:', error);
        }
      );
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  cargarUsuarioParaEdicion(usuario: Usuario): void {
    this.usuarioEditado = { ...usuario };
    this.mostrarFormularioEdicion = true;
  }

  guardarUsuario(): void {
    if (this.usuarioEditado.id) {
      this.actualizarUsuario(this.usuarioEditado.id, this.usuarioEditado);
    } else {
      this.crearUsuario();
    }
  }

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
    this.usuarioEditado = {
      id: '',
      nombre: '',
      apellido: '',
      correo: '',
      clave: '',
      numeroDeTelefono: '',
      direcciones: [],
      rol: RolUsuario.Usuario
    };
    this.mostrarFormularioEdicion = false;
  }

  actualizarUsuario(id: string, usuario: Usuario): void {
    const numericId = Number(id);
    this.usuarioService.actualizarUsuario(numericId, usuario).subscribe({
      next: () => {
        alert('Usuario actualizado');
        this.obtenerUsuarios();
        this.limpiarFormulario();
      },
      error: (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    });
  }

  eliminarUsuario(id: string): void {
    const numericId = Number(id);
    this.usuarioService.eliminarUsuario(numericId).subscribe({
      next: () => {
        alert('Usuario eliminado');
        this.obtenerUsuarios();
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    });
  }
}
