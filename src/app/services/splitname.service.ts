import { Injectable } from '@angular/core';
import { Product } from '../response/Product';
import { ProductToShow } from '../response/ProductToShow';
import { ProductToShowCart } from '../response/ProductToShowCart';

@Injectable({
  providedIn: 'root'
})
export class SplitnameService {

  constructor() { }

  public splitName(product:Product):ProductToShow{
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
  public splitNameCart(product:Product, quantity:number):ProductToShowCart{
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
      productId:product.productId,
      quantity:quantity
    }



    return productToShow;
  }
}
