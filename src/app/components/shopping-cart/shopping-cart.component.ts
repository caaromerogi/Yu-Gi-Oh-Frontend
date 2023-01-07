import { Component, OnInit } from '@angular/core';
import { ProductInPurchase } from 'src/app/response/ProductInPurchase';
import { ProductToShow } from 'src/app/response/ProductToShow';
import { ProductToShowCart } from 'src/app/response/ProductToShowCart';
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
  products:ProductToShowCart[] = []
  productsDictionary ={
    products:this.products,
  }
  tempCart = localStorage.getItem('cart');
  name:string ="";
  idType:string="";
  idNumber:number=0;
  productsToBuy:ProductInPurchase[] =[]
  //Traer por id todos los del localStorage
  async getCartItems(){
    if(localStorage.getItem('cart')){
      let cart = JSON.parse(localStorage.getItem('cart') as string) as ProductInPurchase[]
      cart.forEach(p => {

        let query = {
          productId:p.productId
        }

        let products ={
          productId:p.productId,
          quantity:p.quantity
        }

        this.httpService.getProductById(query)
        .subscribe({
          next: result =>{
            this.products.push(this.splitNameService.splitNameCart(result, p.quantity))
            this.productsToBuy.push(products)
          },
          error: err => alert(err)
        })
      })
      console.log(this.productsToBuy)
    }
  }

  async generatePurchase(){

    let command = {
      idType:this.idType,
      idNumber:String(this.idNumber),
      clientName:this.name,
      products:this.productsToBuy
    }
    this.httpService.generatePurchase(command)
    .subscribe({
      next: result => {
        alert(result.message);
        this.name ="";
        this.idNumber = 0;
        this.idType ="";
        localStorage.removeItem('cart')
      },
      error:err=> console.error(err)
    })
  }


}
