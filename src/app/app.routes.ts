import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'usuario/inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio', // Redirigir '/inicio' a '/usuario/inicio'
        redirectTo: 'usuario/inicio',
        pathMatch: 'full'
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
        path: 'inicio', // Redirigir '/inicio' a '/usuario/inicio'
        redirectTo: 'usuario/inicio',
        pathMatch: 'full'
    },
    {
        path: '**', // Ruta para manejar cualquier otra ruta no definida
        redirectTo: 'usuario/inicio'
    }
];
