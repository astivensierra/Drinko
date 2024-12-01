import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'stock', 'acciones'];
  dataSource: Producto[] = [];

  nuevoProducto: Producto = {
    id: '',
    nombre: '',
    precio: 0,
    stock: 0,
    categoriaId: '',
    imagen: '',
    descripcion: '',
    mililitros: 0,
    gradosDeAlcohol: 0,
    calificacion: 0
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((productos) => {
      this.dataSource = productos;
    });
  }

  actualizarProducto(id: string, producto: Producto): void {
    this.productoService.actualizarProducto(id, producto).subscribe(() => {
      alert('Producto actualizado');
      this.productoService.obtenerProductos().subscribe((productos: Producto[]) => {
        this.dataSource = productos;
      });
    }, (error: any) => {
      console.error('Error al actualizar el producto:', error);
    });
  }

  crearProducto(producto: Producto): void {
    this.productoService.crearProducto(producto).subscribe(() => {
      alert('Producto creado');
      this.productoService.obtenerProductos().subscribe((productos: Producto[]) => {
        this.dataSource = productos;
      });
    }, (error: any) => {
      console.error('Error al crear el producto:', error);
    });
  }

  eliminarProducto(id: string): void {
    this.productoService.eliminarProducto(id).subscribe(() => {
      alert('Producto eliminado');
      this.productoService.obtenerProductos().subscribe((productos: Producto[]) => {
        this.dataSource = productos;
      });
    }, (error: any) => {
      console.error('Error al eliminar el producto:', error);
    });
  }

  obtenerProductoPorId(id: string): void {
    this.productoService.obtenerProductoPorId(id).subscribe((producto) => {
      console.log('Producto:', producto);
    }, (error: any) => {
      console.error('Error al obtener el producto por ID:', error);
    });
  }
}
