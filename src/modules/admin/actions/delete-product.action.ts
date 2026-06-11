import { privateApi } from "@/api/privateApi"

export const deleteProductAction = async (id: number): Promise<void> => {
    await privateApi.delete<void>(`/productos/${id}`);
}