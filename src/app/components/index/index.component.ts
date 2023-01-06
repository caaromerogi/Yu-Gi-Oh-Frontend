import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { max } from 'rxjs';
import { GetPaginatedResultQuery } from 'src/app/queries/GetPaginatedResultQuery';
import { PaginatedList } from 'src/app/response/PaginatedList';
import { Product } from 'src/app/response/Product';
import { ProductToShow } from 'src/app/response/ProductToShow';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  constructor(
    private router: Router,
    private httpClient: HttpServiceService
  ){};
  ngOnInit(): void {
    this.getProducts();
  }

  products: Product[] = [];
  paginatedResult?:PaginatedList<Product>;
  productsToShow: ProductToShow[] = [];
  query:GetPaginatedResultQuery ={
    pageNumber: 1,
    pageSize:10
  }

  private async getProducts():Promise<void>{
    this.generateRandomPageSize();
    this.httpClient.getPaginatedProductsResult(this.query)
    .subscribe({
      next: productsResult =>{
        this.paginatedResult = productsResult;
        productsResult.elements.forEach(product=>{
          this.products.push(product);
        })
        this.showProductsIndex();
      }
    })
  }

  private showProductsIndex():void {
    if (this.products.length < 4) {
      this.products.forEach(p => {
        this.productsToShow.push(this.splitName(p));
      })
    }
    if (this.products.length >= 4) {
      let randomProduct1 = Math.floor(Math.random() * this.products.length);
      let randomProduct2 = Math.floor(Math.random() * this.products.length);
      let randomProduct3 = Math.floor(Math.random() * this.products.length);

      while (
        randomProduct2 == randomProduct1 ||
        randomProduct2 == randomProduct3
      ) {
        randomProduct2 = Math.floor(Math.random() * this.products.length);
      }

      while (
        randomProduct3 == randomProduct2 ||
        randomProduct3 == randomProduct1
      ) {
        randomProduct3 = Math.floor(Math.random() * this.products.length);
      }

      this.productsToShow.push(
        this.splitName(this.products[randomProduct1])
        );
      this.productsToShow.push(
        this.splitName(this.products[randomProduct2])
        );
      this.productsToShow.push(
        this.splitName(this.products[randomProduct3])
        );
    }
  }

  private generateRandomPageSize():void{
    let randomPageSize = Math.floor(Math.random()*100);
    if (randomPageSize < 3){
      randomPageSize = 3
    }
    this.query.pageSize=randomPageSize;
  }

  private splitName(product:Product):ProductToShow{
    let productProperties = product.productName.split("-");
    let productName = productProperties[0];
    let productCategory = productProperties[1];
    let productPrice = productProperties[2];
    let productImgPath = productProperties[3];
    let productToShow ={
      category: productCategory,
      productName: productName,
      productPrice:Number(productPrice),
      imgPath:productImgPath,
      inInventory:product.inInventory,
      maxPurchase:product.maxPurchase,
      minPurchase:product.minPurchase,
      productId:product.productId
    }

    return productToShow;
  }


}
