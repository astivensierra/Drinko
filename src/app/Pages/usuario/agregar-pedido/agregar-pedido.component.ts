import { Component, OnInit } from '@angular/core';
import { AuthResponse } from '../../../core/models/auth.model';
import { Carrito } from '../../../core/models/carrito.model';
import { AuthService } from '../../../core/services/auth.service';
import { CarritoService } from '../../../core/services/carrito.service';
import { PedidoService } from '../../../core/services/pedido.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EncabezadoComponent } from "../../../shared/components/encabezado/encabezado.component";
import { Pedido, ProductoPedido } from '../../../core/models/pedido.model';
import { Direccion } from '../../../core/models/direccion.model';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
    selector: 'app-agregar-pedido',
    standalone: true,
    templateUrl: './agregar-pedido.component.html',
    styleUrl: './agregar-pedido.component.css',
    imports: [CommonModule, FormsModule, EncabezadoComponent]
})
export class AgregarPedidoComponent implements OnInit {
  productosCarrito: ProductoPedido[] = [];
  direcciones: Direccion[] = [];
  total: number = 0;
  carrito: Carrito = {} as Carrito;
  usuario: AuthResponse | null = {} as AuthResponse;
  direccionSeleccionada: string = '';

  constructor(
    private carritoService: CarritoService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerDatosUsuario();
    if (this.usuario) {
      this.cargarProductosCarrito();
      this.cargarDirecciones();
    }
  }

  cargarProductosCarrito(): void {
    this.carritoService.obtenerCarritoPorIdDeUsuario(this.usuario!.usuarioId).subscribe(
      (carrito) => {
        this.carrito = carrito;
        this.productosCarrito = carrito.productos;
        this.actualizarTotal();
      },
      error => {
        console.log("Error al cargar los productos del carrito: ", error);
      }
    );
  }

  cargarDirecciones(): void {
    this.usuarioService.obtenerUsuarioPorId(this.usuario!.usuarioId).subscribe(
      (usuario) => {
        this.direcciones = usuario.direcciones;
      },
      error => {
        console.log("Error al cargar las direcciones: ", error);
      }
    );
  }

  actualizarTotal(): void {
    this.total = this.productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  }

  agregarNuevaDireccion(): void {
    // Navega a un formulario para agregar una nueva dirección
    this.router.navigate(['/usuario/agregar-direccion']);
  }

  realizarPedido(): void {
    if (!this.direccionSeleccionada) {
      alert("Por favor, selecciona una dirección para el envío.");
      return;
    }

    const nuevoPedido: Pedido = {
      id: '',
      usuarioId: '',
      direccionId: '',
      productos: [] as ProductoPedido[], // Asegúrate de tener un array de ProductoPedido
      cliente: '', // Agrega un valor por defecto para cliente
      fecha: new Date(), // Agrega un valor por defecto para fecha
      estado: ''
    };

    this.pedidoService.crearPedido(nuevoPedido).subscribe(
      response => {
        console.log("Pedido realizado con éxito", response);
        this.carritoService.vaciarCarrito(this.carrito.id).subscribe(
          () => {
            console.log("Carrito vaciado con éxito");
            this.router.navigate(['/usuario/pedidos']);
          },
          error => {
            console.log("Error al vaciar el carrito: ", error);
          }
        );
      },
      error => {
        console.log("Error al realizar el pedido: ", error);
      }
    );
  }
}
