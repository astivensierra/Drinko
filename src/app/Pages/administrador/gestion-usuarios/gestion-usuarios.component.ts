import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../core/services/usuario.service'; // Asegúrate de tener este servicio
import { Usuario } from '../../../core/models/usuario.model';
@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
})
export class GestionUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'acciones'];
  dataSource: any[] = [];

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
  });
}

eliminarUsuario(id: number): void {
  this.usuarioService.eliminarUsuario(id).subscribe(() => {
    alert('Usuario eliminado');
    this.usuarioService.obtenerUsuarios();
  }, (error) => {
    console.error('Error al eliminar el usuario:', error);
  });
}

actualizarUsuario(id: number, usuario: Usuario): void {
  this.usuarioService.actualizarUsuario(id, usuario).subscribe(() => {
    alert('Usuario actualizado');
    this.usuarioService.obtenerUsuarios();
  }, (error) => {
    console.error('Error al actualizar el usuario:', error);
  });
}
}
