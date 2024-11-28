
export interface Carrito {
    id: string;
    usuarioId: string;
    productos: ProductoCarrito[];
  }
  
  export interface ProductoCarrito {
    id: string;
    productoId: string;
    imagen: string;
    cantidad: number;
    precio: number;
  }
  