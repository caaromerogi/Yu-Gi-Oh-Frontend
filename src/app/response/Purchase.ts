import { ProductInPurchaseResponse } from "./ProductInPurchaseResponse";

export type Purchase ={
  purchaseId:number;
  date:string;
  idType:string;
  idNumber:string;
  clientName:string;
  products: ProductInPurchaseResponse[]
}
