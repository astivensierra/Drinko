import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Usuario, RolUsuario, UsuarioRegistro } from '../../../core/models/usuario.model';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, FormsModule, MatIconModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  clave: string = '';
  confirmClave: string = '';
  numeroDeTelefono: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.clave !== this.confirmClave) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const usuario: UsuarioRegistro = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      clave: this.clave,
      numeroDeTelefono: this.numeroDeTelefono,
      rol: 0, // Rol de usuario por defecto
      direcciones: [], // Lista de direcciones vacía
    };

    console.log('Datos enviados:', usuario);

    this.authService.registrarUsuario(usuario).subscribe(
      (response) => {
        alert('Registro exitoso');
        this.router.navigate(['/inicio-sesion']);
      },
      (error) => {
        console.error('Error al registrarse:', error);
        alert('Error al registrarse');
      }
    );
  }
}
