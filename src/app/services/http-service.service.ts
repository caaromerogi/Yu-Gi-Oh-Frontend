import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedList } from '../response/PaginatedList';
import { Product } from '../response/Product';
import { GetPaginatedResultQuery } from '../queries/GetPaginatedResultQuery';
import { CreatePurchaseCommand } from '../commands/CreatePurchaseCommand';
import { ResponseModel } from '../response/ResponseModel';
import { AddProductCommand } from '../commands/AddProductCommand';
import { GetProductById } from '../queries/GetProductByIdQuery';
import { DeleteProductCommand } from '../commands/DeleteProductCommand';
import { UpdateProductCommand } from '../commands/UpdateProductCommand';
import { GetPurchasesQuery } from '../queries/GetPurchasesQuery';
import { Purchase } from '../response/Purchase';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient) { }

  host:string = "https://localhost:7098";

  addProduct(command:AddProductCommand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.host + "/Product/AddProduct",command);
  }

  deleteProduct(command:DeleteProductCommand):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.host + `/Product/DeleteProduct?ProductId=${command.productId}`);
  }

  updateProduct(commamd:UpdateProductCommand):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.host + '/Product/EditProduct',commamd);
  }

  getPaginatedProductsResult(query:GetPaginatedResultQuery):Observable<PaginatedList<Product>>{
    return this.httpClient.get<PaginatedList<Product>>(this.host +
      `/Product/GetProductsPagination?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`);
  }

  getProductById(query:GetProductById):Observable<Product>{
    return this.httpClient.get<Product>(this.host+`/Product/GetProductById?ProductId=${query.productId}`);
  }

  generatePurchase(command:CreatePurchaseCommand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.host + '/Purchase/CreatePurchaseOrder', command);
  }

  getAllPurchases(query:GetPurchasesQuery):Observable<Purchase[]>{
    return this.httpClient.get<Purchase[]>(this.host + '/Purchase/GetPurchases');
  }

}
