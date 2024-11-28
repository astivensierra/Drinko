import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Usuario } from '../../../core/models/usuario.model';
import { AuthResponse } from '../../../core/models/auth.model';
import { MatIconModule } from '@angular/material/icon';
import { EncabezadoComponent } from "../../../shared/components/encabezado/encabezado.component"; // Importa MatIconModule para los iconos de Material
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css'],
    standalone: true,
    imports: [CommonModule, MatIconModule, EncabezadoComponent, RouterModule] // Añade MatIconModule aquí
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {} as Usuario;
  usuarioAuth: AuthResponse | null = {} as AuthResponse;

  constructor(private authService: AuthService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioAuth = this.authService.obtenerDatosUsuario();
    if (this.usuarioAuth == null) {
      return;
    }
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    this.usuarioService.obtenerUsuarioPorId(this.usuarioAuth!.usuarioId).subscribe(
      (usuario) => {
        this.usuario = usuario;
      },
      error => {
        console.log("Error al obtener la información del usuario: ", error);
      }
    );
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion()
  }
}
