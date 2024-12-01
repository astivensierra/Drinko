import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.obtenerRolUsuario();
    if (role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/usuario/inicio']);
      return false;
    }
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
