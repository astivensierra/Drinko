import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductoService } from '../../../core/services/producto.service';
import { CategoriaService } from '../../../core/services/categoria.service'; // Import CategoriaService
import { Producto } from '../../../core/models/producto.model';
import { Categoria } from '../../../core/models/categoria.model';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'mililitros', 'gradosDeAlcohol', 'calificacion', 'acciones'];
  dataSource: Producto[] = [];
  categorias: Categoria[] = [];

  nuevoProducto: Producto = {
    id: '',
    nombre: '',
    categoriaId: '',
    imagen: '',
    descripcion: '',
    mililitros: 0,
    gradosDeAlcohol: 0,
    calificacion: 0,
    precio: 0,
    stock: 0
  };

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  // Cargar productos
  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productos) => (this.dataSource = productos),
      (error) => console.error('Error al cargar productos:', error)
    );
  }

  // Cargar categorías
  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (categorias) => (this.categorias = categorias),
      (error) => console.error('Error al cargar categorías:', error)
    );
  }

  // Crear producto
  crearProducto(): void {
    if (this.validarProducto(this.nuevoProducto)) {
      this.productoService.crearProducto(this.nuevoProducto).subscribe(
        () => {
          alert('Producto creado exitosamente');
          this.cargarProductos(); // Recargar productos
          this.limpiarFormulario(); // Limpiar formulario
        },
        (error) => console.error('Error al crear producto:', error)
      );
    } else {
      alert('Por favor, complete todos los campos requeridos');
    }
  }

  // Actualizar producto
  actualizarProducto(id: string, producto: Producto): void {
    this.productoService.actualizarProducto(id, producto).subscribe(
      () => {
        alert('Producto actualizado');
        this.cargarProductos();
      },
      (error) => console.error('Error al actualizar producto:', error)
    );
  }

  // Eliminar producto
  eliminarProducto(id: string): void {
    this.productoService.eliminarProducto(id).subscribe(
      () => {
        alert('Producto eliminado');
        this.cargarProductos();
      },
      (error) => console.error('Error al eliminar producto:', error)
    );
  }

  // Validar producto antes de crear o actualizar
  validarProducto(producto: Producto): boolean {
    return !!(producto.nombre && producto.categoriaId && producto.precio);
  }

  // Limpiar formulario
  limpiarFormulario(): void {
    this.nuevoProducto = {
      id: '',
      nombre: '',
      categoriaId: '',
      imagen: '',
      descripcion: '',
      mililitros: 0,
      gradosDeAlcohol: 0,
      calificacion: 0,
      precio: 0,
      stock: 0
    };
  }
}
