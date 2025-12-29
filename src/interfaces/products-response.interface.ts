export interface ProductsResponse {
    content:          ProductInterface[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface ProductInterface {
    idProducto:   number;
    nombre:       string;
    descripcion:  string;
    stock:        number;
    marca:        string;
    preciounit:   number;
    modEmpleo:    string;
    advert:       string;
    categorias:   string[];
    imagenesUrls: any[];
}


export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}

export interface CategoriesResponse {
    idCategory: number;
    categoria:  string;
    objetivo:   string;
}


