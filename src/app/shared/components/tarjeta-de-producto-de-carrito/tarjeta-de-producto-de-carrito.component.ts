import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { CarritoService } from '../../../core/services/carrito.service';
import { Producto } from '../../../core/models/producto.model';
import { ProductoCarrito } from '../../../core/models/carrito.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tarjeta-de-producto-de-carrito',
  templateUrl: './tarjeta-de-producto-de-carrito.component.html',
  styleUrls: ['./tarjeta-de-producto-de-carrito.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule]
})
export class TarjetaDeProductoDeCarritoComponent implements OnInit {
  @Input() productoCarrito: ProductoCarrito = {} as ProductoCarrito;
  @Input() carritoId: string = ''; 
  @Output() productoEliminado = new EventEmitter<void>();
  @Output() cantidadActualizada = new EventEmitter<void>();
  producto: Producto = {} as Producto;

  constructor(
    private productoService: ProductoService, 
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productoService.obtenerProductoPorId(this.productoCarrito.productoId).subscribe(
      (producto: Producto) => {
        this.producto = producto;
      },
      error => {
        console.log('Error al obtener el producto', error);
      }
    );
  }

  EliminarProducto(): void {
    this.carritoService.eliminarProducto(this.carritoId, this.productoCarrito.id).subscribe(
      response => {
        console.log('Producto eliminado', response);
        this.productoEliminado.emit();
      },
      error => {
        console.log('Error al eliminar el producto', error);
      }
    );
  }

  actualizarCantidad(): void {
    if (this.productoCarrito.cantidad < 1) {
      this.productoCarrito.cantidad = 1;
    }

    this.cantidadActualizada.emit();
    /*this.carritoService.actualizarCantidadProducto(this.carritoId, this.productoCarrito.id, this.productoCarrito.cantidad).subscribe(
      response => {
        console.log('Cantidad actualizada', response);
        this.cantidadActualizada.emit();
      },
      error => {
        console.log('Error al actualizar la cantidad', error);
      }
    );*/
  }
}
