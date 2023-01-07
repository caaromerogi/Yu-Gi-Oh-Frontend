import { Component, OnInit } from '@angular/core';
import { ProductInPurchase } from 'src/app/response/ProductInPurchase';
import { ProductToShow } from 'src/app/response/ProductToShow';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { SplitnameService } from 'src/app/services/splitname.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  ngOnInit(): void {
    this.getCartItems();
  }
  constructor(private httpService:HttpServiceService,
    private splitNameService:SplitnameService){
  }
  products:ProductToShow[] =[]

  //Traer por id todos los del localStorage
  async getCartItems(){
    if(localStorage.getItem('cart')){
      let cart = JSON.parse(localStorage.getItem('cart') as string) as ProductInPurchase[]
      cart.forEach(p => {
        let query = {
          productId:p.productId
        }

        this.httpService.getProductById(query)
        .subscribe({
          next: result =>{
            this.products.push(this.splitNameService.splitName(result))
          },
          error: err => alert(err)
        })
      })
      console.log(this.products)
    }
  }


}
