import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InicioDeSesionDTO } from '../../../core/models/auth.model';

@Component({
  selector: 'app-inicio-de-sesion',
  standalone: true,
  imports: [FormsModule, RouterModule, MatIconModule],  // Importar MatIconModule aquí
  templateUrl: './inicio-de-sesion.component.html',
  styleUrls: ['./inicio-de-sesion.component.css']
})
export class InicioDeSesionComponent {
  correo: string = '';
  clave: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const credentials: InicioDeSesionDTO = { correo: this.correo, clave: this.clave };

    this.authService.iniciarSesion(credentials).subscribe(
      (response) => {
        this.authService.guardarToken(response.token);  // Guardar el token recibido

        const rol = this.authService.obtenerRolUsuario(); // Obtener el rol del usuario
        console.log('Rol del usuario:', rol); // Agregar log para verificar el rol

        if (rol === 'Administrador') {
          console.log('Redirigiendo a /administrador/inicio');
          this.router.navigate(['/administrador/inicio']);  // Navegar a '/administrador/inicio'
        } else {
          console.log('Redirigiendo a /usuario/inicio');
          this.router.navigate(['/usuario/inicio']);  // Navegar a '/usuario/inicio'
        }

        // Mostrar alerta de éxito
        alert('Inicio de sesión exitoso');
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        // Mostrar alerta de error
        alert('Error al iniciar sesión');
      }
    );
  }
}
