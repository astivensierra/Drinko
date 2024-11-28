import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Producto } from '../../../core/models/producto.model';
import { ProductoService } from '../../../core/services/producto.service';
import { EncabezadoComponent } from "../../../shared/components/encabezado/encabezado.component";
import { CarritoService } from '../../../core/services/carrito.service';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/models/auth.model';
import { Carrito } from '../../../core/models/carrito.model';

@Component({
  selector: 'app-detalles-de-producto',
  templateUrl: './detalles-de-producto.component.html',
  styleUrls: ['./detalles-de-producto.component.css'],
  standalone: true,
  imports: [EncabezadoComponent], // Asegúrate de que esté configurado correctamente aquí
})
export class DetallesDeProductoComponent implements OnInit {
  productoId: string = '';
  producto: Producto = {} as Producto;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.productoId = params['productoId'];
      if (this.productoId) {
        this.obtenerProducto(); // Llama a obtenerProducto() si hay un ID de producto en los parámetros
      }
    });

    
  }

  obtenerProducto(): void {
    this.productoService.obtenerProductoPorId(this.productoId).subscribe(
      (producto: Producto) => {
        this.producto = producto;
        console.log(this.producto);
      },
      (error: any) => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  agregarAlCarrito(): void {
    // Obtener datos del usuario autenticado
    const usuario: AuthResponse | null = this.authService.obtenerDatosUsuario();

    console.log(usuario)

    if (!usuario) {
      console.error('Usuario no autenticado.');
      return;
    }

    // Obtener o crear el carrito del usuario
    this.carritoService.obtenerCarritoPorIdDeUsuario(usuario.usuarioId).subscribe(
      (carrito: Carrito) => {
        this.agregarProductoAlCarrito(carrito.id);
        
      },
      (error: any) => {
        console.error('Error al obtener el carrito del usuario:', error);
      }
    );
  }

  agregarProductoAlCarrito(idCarrito: string): void {
    // Construir el objeto de producto a agregar al carrito
    const productoCarrito = {
      idCarrito: idCarrito,
      productoId: this.producto.id,
      imagen: this.producto.imagen,
      cantidad: 1, // Cantidad inicial del producto en el carrito
      precio: this.producto.precio
    };

    // Llamar al servicio para agregar el producto al carrito
    this.carritoService.agregarProducto(idCarrito, productoCarrito).subscribe(
      (response: any) => {
        alert("Producto agregado al carrito de compras!")
        console.log('Producto agregado al carrito:', response);
        // Aquí podrías agregar lógica adicional como mostrar un mensaje de éxito, actualizar el estado del carrito, etc.
      },
      (error: any) => {
        console.error('Error al agregar el producto al carrito:', error);
      }
    );
  }
}
