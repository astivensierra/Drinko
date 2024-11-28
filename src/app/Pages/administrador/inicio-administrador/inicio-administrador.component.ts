import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionCategoriasComponent } from '../gestion-categorias/gestion-categorias.component';
import { GestionPedidosComponent } from '../gestion-pedidos/gestion-pedidos.component';
import { GestionProductosComponent } from '../gestion-productos/gestion-productos.component';
import { GestionUsuariosComponent } from '../gestion-usuarios/gestion-usuarios.component';

@Component({
  selector: 'app-inicio-administrador',
  standalone: true,
  imports: [
    CommonModule,
    GestionCategoriasComponent,
    GestionPedidosComponent,
    GestionProductosComponent,
    GestionUsuariosComponent
  ],
  templateUrl: './inicio-administrador.component.html',
  styleUrls: ['./inicio-administrador.component.css']
})
export class InicioAdministradorComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
