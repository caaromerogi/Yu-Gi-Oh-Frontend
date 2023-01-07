import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInPurchase } from 'src/app/response/ProductInPurchase';
import { ProductToShow } from 'src/app/response/ProductToShow';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { SplitnameService } from 'src/app/services/splitname.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.getProductById();
  }

  constructor(private activatedRoute: ActivatedRoute,
    private httpClient: HttpServiceService,
    private router: Router,
    private splitNameService:SplitnameService){}

    product?:ProductToShow;
    productId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    quantity:number = 0;
    productsArray:ProductInPurchase[] =[];

  async getProductById(){
    let query ={
      productId:Number(this.productId)
    }
    this.httpClient.getProductById(query)
    .subscribe({
      next:item => {
        console.log(item)
        this.product = this.splitNameService.splitName(item);
      }
    })
  }
  public async deleteProduct(id:number){
    let command = {
      productId:id
    }
    this.httpClient.deleteProduct(command)
    .subscribe({
      next: response => {
        alert(response.message)
        document.getElementById('closeModalButton')?.click();
        this.router.navigateByUrl('/products')

      },
      error: err => {
        alert(err.message)
      }
    })
  }

  public sendToCart():void{
    if(this.validate()){
        //validar que no esté vacio
      if(localStorage.getItem('cart')===null){
        //Si está vacio se genera uno nuevo
        localStorage.setItem('cart', JSON.stringify(this.productsArray))
      }
      let cart = JSON.parse(localStorage.getItem('cart') as string) as ProductInPurchase[]
      //Validar que el item no esté en el carro
        //si está se saca y se suma la cantidad y se verifica que no tenga mas o menos de la max
      if(cart.find(p => p.productId === this.product?.productId)){
        let prodinp = cart.find(p => p.productId)!;
        this.quantity= Number(prodinp!.quantity) + Number(this.quantity)
        if(this.validate()){
          cart.filter(p => p.productId === this.product!.productId).map(p => p.quantity = this.quantity);
          localStorage.setItem('cart', JSON.stringify(cart))
          alert("Product successfully added")
        }
      }else{
        let product ={
          productId:this.product!.productId,
          quantity:this.quantity
        }
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart))
        alert("Product successfully added")
      }
    }
  }

  public validate():boolean{
    let bool = true;
    if(this.quantity > this.product!.maxPurchase){
      alert("Max purchase in your cart is "+ this.product!.maxPurchase);
      bool = false;
    }
    if(this.quantity < this.product!.minPurchase){
      alert("Min purchase in your cart is "+ this.product!.minPurchase);
      bool = false;
    }
    return bool;
  }

  public goToEdit(id:number):void{
    this.router.navigateByUrl(`createProduct/${id}`)
  }
}
