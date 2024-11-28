export interface Pedido {
    id: string;
    usuarioId: string;
    direccionId: string,
    cliente: string;
    fecha: Date;
    estado: string;
    productos: any[];
  }

  export interface ProductoPedido{
    id: string;
    productoId: string;
    imagen: string;
    cantidad: number;
    precio: number;
  }
