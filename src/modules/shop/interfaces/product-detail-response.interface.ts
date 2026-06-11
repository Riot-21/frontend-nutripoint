import type { ProductInterface } from "./products-response.interface";

export interface ProductDetailResponse {
  product: ProductInterface;
  relatedProducts: RelatedProduct[];
}

export interface RelatedProduct {
  idProducto: number;
  nombre: string;
  precio: number;
  categorias: string[];
  imagenUrl: string;
}
