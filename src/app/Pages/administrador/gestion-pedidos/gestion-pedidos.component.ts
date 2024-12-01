import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { PedidoService } from '../../../core/services/pedido.service';
import { Pedido } from '../../../core/models/pedido.model';

@Component({
  selector: 'app-gestion-pedidos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})
export class GestionPedidosComponent implements OnInit {
  columnasDisplay: string[] = ['id', 'cliente', 'fecha', 'estado', 'acciones'];
  pedidos: Pedido[] = [];

  nuevoPedido: Pedido = {
    id: '',
    cliente: '',
    fecha: new Date(),
    estado: '',
    usuarioId: '',
    direccionId: '',
    productos: []
  };

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.obtenerPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  actualizarPedido(id: string, pedido: Pedido): void {
    this.pedidoService.actualizarPedido(id, pedido).subscribe(() => {
      alert('Pedido actualizado');
      this.pedidoService.obtenerPedidos().subscribe((pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      });
    }, (error: any) => {
      console.error('Error al actualizar el pedido:', error);
    });
  }

  eliminarPedido(id: string): void {
    this.pedidoService.eliminarPedido(id).subscribe(() => {
      alert('Pedido eliminado');
      this.pedidoService.obtenerPedidos().subscribe((pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      });
    }, (error: any) => {
      console.error('Error al eliminar el pedido:', error);
    });
  }

  obtenerPedidoPorId(id: string): void {
    this.pedidoService.obtenerPedidoPorId(id).subscribe((pedido) => {
      console.log('Pedido:', pedido);
    }, (error: any) => {
      console.error('Error al obtener el pedido por ID:', error);
    });
  }

  crearPedido(pedido: Pedido): void {
    this.pedidoService.crearPedido(pedido).subscribe(() => {
      alert('Pedido creado');
      this.pedidoService.obtenerPedidos().subscribe((pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      });
    }, (error: any) => {
      console.error('Error al crear el pedido:', error);
    });
  }
}
