import { Component, OnInit } from '@angular/core';
import { EncabezadoComponent } from "../../../shared/components/encabezado/encabezado.component";
import { Pedido } from '../../../core/models/pedido.model';
import { AuthResponse } from '../../../core/models/auth.model';
import { PedidoService } from '../../../core/services/pedido.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pedidos',
    standalone: true,
    templateUrl: './pedidos.component.html',
    styleUrl: './pedidos.component.css',
    imports: [EncabezadoComponent, FormsModule, CommonModule]
})
export class PedidosComponent implements OnInit {
    pedidos: Pedido[] = [];
    usuario: AuthResponse | null = {} as AuthResponse;
  
    constructor(private pedidoService: PedidoService, private authService: AuthService) {}
  
    ngOnInit(): void {
      this.usuario = this.authService.obtenerDatosUsuario();
      if (this.usuario) {
        this.cargarPedidos();
      }
    }
  
    cargarPedidos(): void {
      this.pedidoService.obtenerPedidosPorUsuarioId(this.usuario!.usuarioId).subscribe(
        (pedidos: Pedido[]) => {
          this.pedidos = pedidos;
        },
        error => {
          console.error('Error al cargar los pedidos:', error);
        }
      );
    }
  }