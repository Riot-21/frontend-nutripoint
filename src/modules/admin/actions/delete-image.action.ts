import { privateApi } from "@/api/privateApi"

export const deleteImageAction = async (id: number): Promise<void> => {
    await privateApi.delete<void>(`/imagenes/${id}`);
}