import { Routes } from '@angular/router';
import { UsuarioLayoutComponent } from './usuario-layout-component/usuario-layout-component.component';  // Importa tu nuevo layout
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { DetallesDeProductoComponent } from './detalles-de-producto/detalles-de-producto.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { ResenasComponent } from './resenas/resenas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CarritoDeComprasComponent } from './carrito-de-compras/carrito-de-compras.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AgregarPedidoComponent } from './agregar-pedido/agregar-pedido.component';
import { AgregarDireccionComponent } from './agregar-direccion/agregar-direccion.component';

export const USUARIO_ROUTES: Routes = [
  {
    path: '',
    component: UsuarioLayoutComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'detalles-de-producto', component: DetallesDeProductoComponent },
      { path: 'sobre-nosotros', component: SobreNosotrosComponent },
      { path: 'resenas', component: ResenasComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'carrito-de-compras', component: CarritoDeComprasComponent, canActivate: [AuthGuard] },
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
      { path: 'mis-pedidos', component: PedidosComponent, canActivate: [AuthGuard] },
      { path: 'realizar-pedido', component: AgregarPedidoComponent, canActivate: [AuthGuard] },
      { path: 'agregar-direccion', component: AgregarDireccionComponent, canActivate: [AuthGuard] },
    ]
  }
];
