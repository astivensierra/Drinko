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
    id: "",
    nombre: '',
    apellido: '',
    correo: "",
    clave: "",
    numeroDeTelefono:"",
    direcciones: [],
    rol: RolUsuario.Usuario
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
      this.dataSource = usuarios;
    });
  }

  verificarExistencia(id: number): void {
    this.usuarioService.verificarExistencia(id).subscribe((existe) => {
      if (existe) {
        alert('El usuario existe');
      } else {
        alert('El usuario no existe');
      }
    }, (error: any) => {
      console.error('Error al verificar la existencia del usuario:', error);
    });
  }

  eliminarUsuario(id: number): void {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      alert('Usuario eliminado');
      this.usuarioService.obtenerUsuarios().subscribe((usuarios: Usuario[]) => {
        this.dataSource = usuarios;
      });
    }, (error: any) => {
      console.error('Error al eliminar el usuario:', error);
    });
  }

  actualizarUsuario(id: number, usuario: Usuario): void {
    this.usuarioService.actualizarUsuario(id, usuario).subscribe(() => {
      alert('Usuario actualizado');
      this.usuarioService.obtenerUsuarios().subscribe((usuarios: Usuario[]) => {
        this.dataSource = usuarios;
      });
    }, (error: any) => {
      console.error('Error al actualizar el usuario:', error);
    });
  }

  crearUsuario(usuario: Usuario): void {
    this.usuarioService.crearUsuario(usuario).subscribe(() => {
      alert('Usuario creado');
      this.usuarioService.obtenerUsuarios().subscribe((usuarios: Usuario[]) => {
        this.dataSource = usuarios;
      });
    }, (error: any) => {
      console.error('Error al crear el usuario:', error);
    });
  }
}
