import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, ProductoPedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://localhost:7248/pedidos'; // URL base de tu API

  constructor(private http: HttpClient) { }

  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  obtenerPedidoPorId(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  obtenerPedidosPorUsuarioId(usuarioId: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos-usuario/${usuarioId}`);
  }

  crearPedido(pedido: { usuarioId: string; direccionId: string }): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  actualizarPedido(id: string, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }

  eliminarPedido(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  verificarPedido(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/verificar/${id}`);
  }

  agregarProducto(pedidoId: string, producto: ProductoPedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/agregar-producto`, { idPedido: pedidoId, ...producto });
  }

  eliminarProducto(pedidoId: string, productoPedidoId: string): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/eliminar-producto`, { pedidoId, productoPedidoId });
  }
}
