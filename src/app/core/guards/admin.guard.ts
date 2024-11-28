import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = this.authService.obtenerToken();

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const rol = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]; // Ajusta esto según la clave exacta en el token

        if (rol === 'Administrador') {
          return true;
        } else {
          return this.router.parseUrl('/inicio-sesion');
        }
      } catch (error) {
        console.error('Error al decodificar el token', error);
        return this.router.parseUrl('/inicio-sesion');
      }
    } else {
      return this.router.parseUrl('/inicio-sesion');
    }
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }
}
