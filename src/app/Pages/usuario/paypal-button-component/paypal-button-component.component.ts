// paypal-button.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../../core/services/carrito.service';
import { PedidoService } from '../../../core/services/pedido.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { AuthService } from '../../../core/services/auth.service';
import { Pedido, ProductoPedido } from '../../../core/models/pedido.model';
import { Direccion } from '../../../core/models/direccion.model';
import { Carrito } from '../../../core/models/carrito.model';
import { AuthResponse } from '../../../core/models/auth.model';

declare const paypal: any; // Declarar el SDK de PayPal

@Component({
  selector: 'app-paypal-button',
  template: `
    <div id="paypal-button-container"></div>
  `,
  styles: [`
    #paypal-button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }
  `],
})
export class PaypalButtonComponent implements OnInit {
  @Input() total: number = 0;
  @Input() carritoId: string = '';
  @Input() direccionSeleccionada: string = '';
  @Input() productosCarrito: ProductoPedido[] = [];
  @Input() usuario: AuthResponse | null = {} as AuthResponse;
  direcciones: Direccion[] = [];
  carrito: Carrito = {} as Carrito;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerDatosUsuario();
    if (this.usuario) {
      this.cargarProductosCarrito();
      this.cargarDirecciones();
    }
    this.renderizarBotonPayPal();
  }

  private renderizarBotonPayPal(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.total.toFixed(2), // Total del carrito
              },
            },
          ],
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Pago realizado con éxito. Detalles: ' + details.id);
          this.realizarPedido();
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago de PayPal', err);
      },
    }).render('#paypal-button-container');
  }

  private cargarProductosCarrito(): void {
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

  private cargarDirecciones(): void {
    this.usuarioService.obtenerUsuarioPorId(this.usuario!.usuarioId).subscribe(
      (usuario) => {
        this.direcciones = usuario.direcciones;
      },
      error => {
        console.log("Error al cargar las direcciones: ", error);
      }
    );
  }

  private actualizarTotal(): void {
    this.total = this.productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  }

  private agregarNuevaDireccion(): void {
    // Navega a un formulario para agregar una nueva dirección
    this.router.navigate(['/usuario/agregar-direccion']);
  }

  private realizarPedido(): void {
    if (!this.direccionSeleccionada) {
      alert("Por favor, selecciona una dirección para el envío.");
      return;
    }

    const nuevoPedido: Pedido = {
      id: '',
      usuarioId: this.usuario!.usuarioId,
      direccionId: this.direccionSeleccionada,
      productos: this.productosCarrito,
      cliente: '', // Agrega un valor por defecto para cliente
      fecha: new Date(), // Agrega un valor por defecto para fecha
      estado: ''
    };

    this.pedidoService.crearPedido(nuevoPedido).subscribe(
      response => {
        console.log("Pedido realizado con éxito", response);
        this.carritoService.vaciarCarrito(this.carritoId).subscribe(
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
