import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { SplitnameService } from 'src/app/services/splitname.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  ngOnInit(): void {
    this.getProductById();
  }
  constructor(private httpSevice:HttpServiceService,
    private activatedRoute: ActivatedRoute,
    private splitService:SplitnameService){}
  productId:string = this.activatedRoute.snapshot.paramMap.get('id') as string;
  name:string = "";
  price:number = 0;
  imgPath:string = "";
  type:string ="Monster";
  inInventory:number = 0;
  maxPurchase:number = 0;
  minPurchase:number = 0;

  async getProductById():Promise<void>{
    if(this.productId !== "0"){
      let query = {
        productId: Number(this.productId)
      }
      this.httpSevice.getProductById(query)
      .subscribe({
        next: result => {
          let splited = this.splitService.splitName(result);
          this.name = splited.productName;
          this.price =splited.productPrice;
          this.imgPath = splited.imgPath;
          this.type=splited.category;
          this.inInventory=splited.inInventory;
          this.maxPurchase = splited.maxPurchase;
          this.minPurchase = splited.minPurchase;
        }
      })
    }
  }

  async addProduct():Promise<void>{
    if (this.productId === "0"){
      let productAdd ={
        productName: this.name+'-'+this.type+'-'+this.price+'-'+this.imgPath,
        inInventory:this.inInventory,
        maxPurchase:this.maxPurchase,
        minPurchase:this.minPurchase
      }
      console.log(productAdd)
      this.httpSevice.addProduct(productAdd)
      .subscribe({
        next:response => {
          alert(response.message)
          this.name = "";
          this.price = 0;
          this.imgPath = "";
          this.type ="Monster";
          this.inInventory = 0;
          this.maxPurchase = 0;
          this.minPurchase = 0;
        },
        error:err => console.error(err)
      })
    }
    if (this.productId !== "0"){
      let productUpdate ={
        productId:Number(this.productId),
        productName: this.name+'-'+this.type+'-'+this.price+'-'+this.imgPath,
        inInventory:this.inInventory,
        maxPurchase:this.maxPurchase,
        minPurchase:this.minPurchase
      }
      console.log(productUpdate)
      this.httpSevice.updateProduct
      (productUpdate)
      .subscribe({
        next:response => {
          alert(response.message)
          this.name = "";
          this.price = 0;
          this.imgPath = "";
          this.type ="Monster";
          this.inInventory = 0;
          this.maxPurchase = 0;
          this.minPurchase = 0;
        },
        error:err => console.error(err)
      })
    }

  }
  public onChange(event:any){
    console.log(event.target.value)
  }
}
