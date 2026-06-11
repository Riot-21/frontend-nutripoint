import { CustomScreenLoading } from "@/components/custom/CustomScreenLoading";
import { Pagination } from "@/components/custom/Pagination";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/modules/shop/hooks/useProducts";
// import { mockProducts2 } from "@/mocks/mocks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { ProductTable } from "../../components/dashboard-products/ProductTable";
import type { ProductInterface } from "@/modules/shop/interfaces/products-response.interface";
import { ProductForm } from "../../components/dashboard-products/ProductForm";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import type { ProductFormData } from "../../interfaces/product.schema";
import { toast } from "sonner";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { ConfirmDialog } from "../../components/dashboard-products/ConfirmDialog";

export const ProductsDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductInterface | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutateAsync: createProduct, isPending: isCreating } =
    useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct();
  const { mutateAsync: deleteProduct, isPending: isDeleting } =
    useDeleteProduct();

  const handleCreate = () => {
    setSelectedProduct(null);
    setOpen(true);
  };

  const handleEdit = (product: ProductInterface) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleSubmit = async (data: ProductFormData) => {
    console.log(data.imagenes);
    try {
      if (selectedProduct) {
        await updateProduct({
          id: selectedProduct.idProducto,
          datos: data,
        });
        toast.success("Producto actualizado correctamente");
      } else {
        await createProduct(data);
        toast.success("Producto creado correctamente");
      }
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const [productToDelete, setProductToDelete] = useState<number | null>(null);

    const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      toast.success("Producto eliminado correctamente.");
      setProductToDelete(null);
    } catch {
      toast.error("No se pudo eliminar el producto.");
    }
  };

  const confirmDeleteProduct = () => {
    if (productToDelete !== null){
      handleDeleteProduct(productToDelete);
    }
  }

  const updateParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const handleChangePage = (nextPage: number) => {
    updateParams(nextPage - 1);
  };

  const { data: products, isLoading } = useProducts({ retry: false });

  if (isLoading) {
    return <CustomScreenLoading></CustomScreenLoading>;
  }

  return (
    <div className="flex bg-background animate-fade-in">
      <main className="flex-1 p-8">
        <div className="max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Gestión de Productos
              </h1>
              <p className="text-muted-foreground">
                Total: {products?.totalElements} productos
              </p>
            </div>
            <Button
              className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white transition-smooth hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
              onClick={handleCreate}
            >
              <Plus />
              Nuevo Producto
            </Button>
          </div>

          <ProductForm
            open={open}
            onOpenChange={setOpen}
            // mode={selectedProduct ? "update" : "create"}
            product={selectedProduct}
            onSubmit={handleSubmit}
            isPending={isCreating || isUpdating}
          ></ProductForm>

          {/* Products Table */}
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={(id)=>setProductToDelete(id)}
          />
          {products && products.content.length > 0 && (
            <Pagination
              totalItems={products.totalElements}
              itemsPerPage={products.size}
              currentPage={products.number + 1}
              onChangePage={handleChangePage}
            />
          )}

          <ConfirmDialog
            open={productToDelete !== null}
            onOpenChange={(open) => {
              if (!open) setProductToDelete(null);
            }}
            title="¿Eliminar producto?"
            description="Esta acción no se puede deshacer."
            confirmText="Eliminar"
            onConfirm={confirmDeleteProduct}
            isPending={isDeleting}
          />
        </div>
      </main>
    </div>
  );
};
