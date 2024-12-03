import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Pedido } from '../../../core/models/pedido.model';
import { Usuario } from '../../../core/models/usuario.model';
import { Producto } from '../../../core/models/producto.model';
import { PedidoService } from '../../../core/services/pedido.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-gestion-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})
export class GestionPedidosComponent implements OnInit {
  columnasDisplay: string[] = ['id', 'cliente', 'fecha', 'estado', 'acciones'];
  pedidos: Pedido[] = [];
  clientes: Usuario[] = [];
  productos: Producto[] = [];

  nuevoPedido: Pedido = {
    id: '',
    usuarioId: '',
    direccionId: '',
    cliente: '',
    fecha: new Date(),
    estado: '',
    productos: []
  };

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuariosPorRol(0).subscribe(clientes => {
      this.clientes = clientes;
    });
    this.cargarPedidos();
    this.cargarProductos();
  }

  cargarPedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  crearPedido(): void {
    if (this.validarPedido(this.nuevoPedido)) {
      this.pedidoService.crearPedido(this.nuevoPedido).subscribe(
        () => {
          alert('Pedido creado exitosamente');
          this.cargarPedidos();
          this.limpiarFormulario();
        },
        (error) => console.error('Error al crear pedido:', error)
      );
    } else {
      alert('Por favor complete todos los campos del pedido');
    }
  }

  actualizarPedido(id: string, pedido: Pedido): void {
    this.pedidoService.actualizarPedido(id, pedido).subscribe(
      () => {
        alert('Pedido actualizado');
        this.cargarPedidos();
      },
      (error) => console.error('Error al actualizar pedido:', error)
    );
  }

  eliminarPedido(id: string): void {
    this.pedidoService.eliminarPedido(id).subscribe(
      () => {
        alert('Pedido eliminado');
        this.cargarPedidos();
      },
      (error) => console.error('Error al eliminar pedido:', error)
    );
  }

  // Productos en el Pedido
  agregarProducto(): void {
    this.nuevoPedido.productos.push({ id: '', productoId: '', imagen: '', cantidad: 1, precio: 0 });
  }

  eliminarProductoDelPedido(index: number): void {
    this.nuevoPedido.productos.splice(index, 1);
  }

  validarPedido(pedido: Pedido): boolean {
    return !!(pedido.cliente && pedido.fecha && pedido.estado && pedido.productos.length);
  }

  limpiarFormulario(): void {
    this.nuevoPedido = {
      id: '',
      usuarioId: '',
      direccionId: '',
      cliente: '',
      fecha: new Date(),
      estado: '',
      productos: []
    };
  }
}
