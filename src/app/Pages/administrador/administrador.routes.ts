import { Routes } from '@angular/router';
import { InicioAdministradorComponent } from './inicio-administrador/inicio-administrador.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { GestionCategoriasComponent } from './gestion-categorias/gestion-categorias.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { GestionPedidosComponent } from './gestion-pedidos/gestion-pedidos.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminGuard } from '../../core/guards/admin.guard';

export const ADMINISTRADOR_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivateChild: [AdminGuard], // Utiliza canActivateChild para proteger todas las rutas hijas
    children: [
      { path: 'inicio', component: InicioAdministradorComponent },
      { path: 'gestion-usuarios', component: GestionUsuariosComponent },
      { path: 'gestion-categorias', component: GestionCategoriasComponent },
      { path: 'gestion-productos', component: GestionProductosComponent },
      { path: 'gestion-pedidos', component: GestionPedidosComponent }
    ]
  }
];
