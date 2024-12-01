import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'usuario/inicio'
  },
  {
    path: '',
    loadChildren: () => import('./Pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./Pages/usuario/usuario.routes').then(m => m.USUARIO_ROUTES)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./Pages/administrador/administrador.routes').then(m => m.ADMINISTRADOR_ROUTES)
  },
  {
    path: '**', // Ruta para manejar cualquier otra ruta no definida
    redirectTo: 'usuario/inicio'
  }
];

// Asegúrate de exportar 'routes'
export { routes };
