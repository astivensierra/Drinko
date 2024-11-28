import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://localhost:7248/carrito-de-compras'; // URL base de tu API

  constructor(private http: HttpClient) { }

  obtenerCarritos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obtenerCarritoPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  obtenerCarritoPorIdDeUsuario(id: string): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.apiUrl}/carrito-usuario/${id}`);
  }

  crearCarrito(usuarioId: string): Observable<any> {
    return this.http.post(this.apiUrl, usuarioId);
  }

  actualizarCarrito(id: string, carrito: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, carrito);
  }

  eliminarCarrito(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  vaciarCarrito(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vaciar/${id}`);
  }

  agregarProducto(carritoId: string, producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar-producto`, { idCarrito: carritoId, ...producto });
  }

  eliminarProducto(carritoId: string, productoCarritoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/eliminar-producto`, { carritoId, productoCarritoId });
  }
}
