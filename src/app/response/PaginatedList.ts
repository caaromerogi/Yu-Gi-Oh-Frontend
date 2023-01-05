import { Product } from "./Product"

export type PaginatedList<T> ={
  elements:T[];
  totalPages:number;
  totalCount:number;
  hasPreviousPage:boolean;
  hasNextPage:boolean
}
