import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  productSchema,
  type ProductFormData,
} from "../../interfaces/product.schema";
import type { ProductInterface } from "@/modules/shop/interfaces/products-response.interface";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBrandsAndCategories } from "@/modules/shop/hooks/useBrandsAndCategories";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useDeleteImage } from "../../hooks/useDeleteImage";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";

const mapProductToForm = (product: ProductInterface): ProductFormData => ({
  nombre: product.nombre,
  descripcion: product.descripcion,
  stock: product.stock,
  marca: product.marca,
  precioUnit: product.preciounit,
  modEmpleo: product.modEmpleo,
  advert: product.advert,
  categorias: product.categorias,
});

const EMPTY_PRODUCT_FORM: ProductFormData = {
  nombre: "",
  descripcion: "",
  stock: 1,
  marca: "",
  precioUnit: 0,
  modEmpleo: "",
  advert: "",
  categorias: [],
};

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: ProductInterface | null;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isPending?: boolean;
}

export const ProductForm = ({
  open,
  onOpenChange,
  product,
  onSubmit,
  isPending = false,
}: ProductFormProps) => {
  const { brands, categories } = useBrandsAndCategories();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: EMPTY_PRODUCT_FORM,
  });

  useEffect(() => {
    if (open) {
      reset(product ? mapProductToForm(product) : EMPTY_PRODUCT_FORM);
    }
  }, [open, product, reset]);

  const isEditing = !!product;
  const selectedBrand = watch("marca");
  const selectedCategories = watch("categorias");
  const images = watch("imagenes") ?? [];

  const { mutateAsync: deleteImage, isPending: deleteImagePending } =
    useDeleteImage();
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const [currentImages, setCurrentImages] = useState(product?.imagenes ?? []);

  useEffect(() => {
    setCurrentImages(product?.imagenes ?? []);
  }, [product]);

  const onFormSubmit = async (data: ProductFormData) => {
    await onSubmit(data);
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      await deleteImage(imageId);
      setCurrentImages((prev) => prev.filter((img) => img.idImage !== imageId));
      toast.success("Imagen eliminada correctamente.");
      setImageToDelete(null);
    } catch {
      toast.error("No se pudo eliminar la imagen.");
    }
  };

  const confirmDeleteImage = () => {
    if (imageToDelete !== null){
      handleDeleteImage(imageToDelete);
    }
  }

  const isLoading = isSubmitting || isPending || deleteImagePending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vh] max-h-[90vh] flex flex-col p-0 gap-0">
        {isLoading && (
          <div
            className="
      absolute inset-0 z-50 rounded-lg
      flex items-center justify-center
      bg-black/30 backdrop-blur-[1px]
    "
          >
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle>
            {!isEditing ? "Nuevo Producto" : "Editar Producto"}
          </DialogTitle>
          <DialogDescription>
            Completa la información del producto.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto scroll-container p-6">
          <form
            id="product-form"
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* NOMBRE */}
              <div>
                <label className="text-sm">Nombre</label>
                <Input
                  placeholder="Nombre de producto"
                  {...register("nombre", {
                    required: true,
                  })}
                />
                {errors.nombre && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              {/* MARCA */}
              <div>
                <label className="text-sm">Marca</label>
                <Select
                  value={selectedBrand}
                  onValueChange={(value) =>
                    setValue("marca", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Marca" />
                  </SelectTrigger>

                  <SelectContent>
                    {brands.data?.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.marca && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.marca.message}
                  </p>
                )}
              </div>

              {/* PRECIO */}
              <div>
                <label className="text-sm">Precio</label>
                <Input
                  type="number"
                  step={0.01}
                  min={0.0}
                  placeholder="Precio"
                  {...register("precioUnit", {
                    valueAsNumber: true,
                  })}
                />

                {errors.precioUnit && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.precioUnit.message}
                  </p>
                )}
              </div>

              {/* STOCK */}
              <div>
                <label className="text-sm">Stock</label>
                <Input
                  type="number"
                  min={1}
                  step={1}
                  placeholder="Stock"
                  {...register("stock", {
                    valueAsNumber: true,
                  })}
                />

                {errors.stock && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              {/* DESCRIPCIÓN */}
              <div className="col-span-2">
                <label className="text-sm">Descripción</label>
                <Textarea
                  placeholder="Escriba una descripción del producto"
                  {...register("descripcion")}
                />

                {errors.descripcion && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.descripcion.message}
                  </p>
                )}
              </div>

              {/* MODO DE EMPLEO */}
              <div className="col-span-2">
                <label className="text-sm">Modo de empleo</label>
                <Textarea
                  placeholder="Modo de empleo"
                  {...register("modEmpleo")}
                />

                {errors.modEmpleo && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.modEmpleo.message}
                  </p>
                )}
              </div>

              {/* ADVERTENCIAS */}
              <div className="col-span-2">
                <label className="text-sm">Advertencias</label>
                <Textarea placeholder="Advertencias" {...register("advert")} />

                {errors.advert && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.advert.message}
                  </p>
                )}
              </div>

              {/* CATEGORIAS */}
              <div className="col-span-2 space-y-3">
                <label className="text-sm font-medium">Categorías</label>

                <div className="grid grid-cols-2 gap-3 rounded-md border p-4">
                  {!categories.data ? (
                    <h1 className="text-sm pl-4 text-red-900">
                      No hay categorias para mostrar
                    </h1>
                  ) : (
                    categories.data.map((category) => {
                      const selected =
                        selectedCategories?.includes(category.categoria) ??
                        false;

                      return (
                        <div
                          key={category.idCategory}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            checked={selected}
                            onCheckedChange={(checked) => {
                              const current = selectedCategories ?? [];

                              if (checked) {
                                setValue(
                                  "categorias",
                                  [...current, category.categoria],
                                  {
                                    shouldValidate: true,
                                  },
                                );
                              } else {
                                setValue(
                                  "categorias",
                                  current.filter(
                                    (c) => c !== category.categoria,
                                  ),
                                  {
                                    shouldValidate: true,
                                  },
                                );
                              }
                            }}
                          />

                          <span className="text-sm">{category.categoria}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                {errors.categorias && (
                  <p className="text-sm text-red-500">
                    {errors.categorias.message}
                  </p>
                )}
              </div>

              {isEditing && currentImages?.length > 0 && (
                <div className="col-span-2 space-y-3">
                  <label className="text-sm font-medium">
                    Imágenes actuales
                  </label>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-lg border p-4 bg-muted/20">
                    {currentImages.map((image, index) => (
                      <div
                        key={"image-" + image.idImage}
                        className="
                              group relative overflow-hidden rounded-lg
                              border bg-background aspect-square
                            "
                      >
                        <Button
                          size="icon"
                          variant="destructive"
                          type="button"
                          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setImageToDelete(image.idImage)}
                        >
                          <Trash2 className="h-4 w-4"></Trash2>
                        </Button>
                        <img
                          src={image.url}
                          alt={`Imagen ${index + 1}`}
                          className="
                          h-full w-full object-cover
                          transition-transform duration-300
                          group-hover:scale-105
                        "
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="col-span-2">
                <label className="text-sm">Nuevas Imagenes</label>
                <FileUploader
                  value={images}
                  onChange={(files) =>
                    setValue("imagenes", files, {
                      shouldValidate: true,
                    })
                  }
                ></FileUploader>
              </div>
            </div>
          </form>
        </div>

        <ConfirmDialog
          open={imageToDelete !== null}
          onOpenChange={(open) => {
            if (!open) setImageToDelete(null);
          }}
          title="¿Eliminar imagen?"
          description="Esta acción no se puede deshacer."
          confirmText="Eliminar"
          onConfirm={confirmDeleteImage}
          isPending={deleteImagePending}
        />
        <DialogFooter className="p-6 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
            disabled={isSubmitting || isPending}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            form="product-form"
            disabled={isSubmitting || isPending}
          >
            {!isEditing ? "Crear Producto" : "Actualizar Producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
