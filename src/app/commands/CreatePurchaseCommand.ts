import { ProductInPurchase } from "../response/ProductInPurchase";

export type CreatePurchaseCommand ={
  idType:string;
  idNumber:string;
  clientName:string;
  products:ProductInPurchase[];
}
