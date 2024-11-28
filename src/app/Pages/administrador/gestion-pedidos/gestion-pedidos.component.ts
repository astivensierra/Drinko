import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../../core/models/pedido.model';
import { PedidoService } from '../../../core/services/pedido.service';

@Component({
  selector: 'app-gestion-pedidos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
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
      this.pedidoService.obtenerPedidos();
    }, (error) => {
      console.error('Error al actualizar el pedido:', error);
    });
  }

  eliminarPedido(id: string): void {
    this.pedidoService.eliminarPedido(id).subscribe(() => {
      alert('Pedido eliminado');
      this.pedidoService.obtenerPedidos().subscribe((pedidos) => {
        this.pedidos = pedidos;
      });
    }, (error) => {
      console.error('Error al eliminar el pedido:', error);
    });
  }

  obtenerPedidoPorId(id: string): void {
    this.pedidoService.obtenerPedidoPorId(id).subscribe((pedido) => {
      console.log(pedido);
    }, (error) => {
      console.error('Error al obtener el pedido:', error);
    });
  }

  verificarPedido(id: string): void {
    this.pedidoService.verificarPedido(id).subscribe((pedido) => {
      console.log(pedido);
    }, (error) => {
      console.error('Error al verificar el pedido:', error);
    });
  }

  crearPedido(pedido: { usuarioId: string; direccionId: string }): void {
    this.pedidoService.crearPedido(pedido).subscribe(() => {
      alert('Pedido creado');
      this.pedidoService.obtenerPedidos().subscribe((pedidos) => {
        this.pedidos = pedidos;
      });
    }, (error) => {
      console.error('Error al crear el pedido:', error);
    });
  }

}
