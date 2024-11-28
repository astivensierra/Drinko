import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncabezadoComponent } from '../../../shared/components/encabezado/encabezado.component';
import { TarjetaDeProductoDeCarritoComponent } from '../../../shared/components/tarjeta-de-producto-de-carrito/tarjeta-de-producto-de-carrito.component';
import { AuthService } from '../../../core/services/auth.service';
import { Carrito, ProductoCarrito } from '../../../core/models/carrito.model';
import { AuthResponse } from '../../../core/models/auth.model';
import { CarritoService } from '../../../core/services/carrito.service';

@Component({
  selector: 'app-carrito-de-compras',
  standalone: true,
  imports: [EncabezadoComponent, TarjetaDeProductoDeCarritoComponent],
  templateUrl: './carrito-de-compras.component.html',
  styleUrls: ['./carrito-de-compras.component.css']
})
export class CarritoDeComprasComponent implements OnInit {

  productosCarrito: ProductoCarrito[] = []
  usuario: AuthResponse | null = {} as AuthResponse
  carrito: Carrito = {} as Carrito
  total: number = 0

  constructor(private authService: AuthService, private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerDatosUsuario()
    if (this.usuario == null){
      return;
    }

    this.cargarProductosCarrito()
  }

  cargarProductosCarrito() : void{
    this.carritoService.obtenerCarritoPorIdDeUsuario(this.usuario!.usuarioId).subscribe(
      (carrito) => {
        this.carrito = carrito
        this.productosCarrito = carrito.productos
        this.actualizarTotal()
      },
      error => {
        console.log("Se ha presentado un error al cargar los productos: ",error)
      }
    );
  }

  actualizarTotal(): void {
    this.total = this.productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito(this.carrito.id).subscribe(
      () => {
        this.productosCarrito = [];
        this.actualizarTotal();
      },
      error => {
        console.log("Se ha presentado un error al vaciar el carrito: ", error)
      }
    );
  }

  comprar(): void {
    this.router.navigate(['/usuario/realizar-pedido']);
  }

  onProductoEliminado(): void {
    this.cargarProductosCarrito();
  }

  onCantidadActualizada(): void {
    this.actualizarTotal();
  }
}
