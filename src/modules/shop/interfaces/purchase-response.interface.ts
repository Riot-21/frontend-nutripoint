export interface PurchaseResponse {
    idCompra:     number;
    codigoCompra: string;
    idUsuario:    number;
    fecha:        Date;
    total:        number;
    tipoPago:     TipoPago;
    direccion:    string;
    distrito:     string;
    estadoCompra: string;
    detalle:      Detalle[];
}

export interface Detalle {
    idDetalle:  number;
    idProducto: number;
    nombreProd: string;
    cantidad:   number;
    precioUnit: number;
    subtotal:   number;
}

type TipoPago = 'PAYPAL' | 'CREDITO' | 'TRANSFERENCIA' | 'YAPE';