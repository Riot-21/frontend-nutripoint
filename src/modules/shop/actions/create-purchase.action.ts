import { privateApi } from "@/api/privateApi";
import type { PurchaseRequest } from "../interfaces/purchase-request.schema";
import type { PurchaseResponse } from "../interfaces/purchase-response.interface";

export const createPurchaseAction = async (
  data: PurchaseRequest,
): Promise<PurchaseResponse> => {

    try{
        const response = await privateApi.post<PurchaseResponse>("/compra", data);
        return response.data;

    }catch(error: any){
        throw error.response?.data?.mensaje ?? "Error al crear la compra"
    }

};
