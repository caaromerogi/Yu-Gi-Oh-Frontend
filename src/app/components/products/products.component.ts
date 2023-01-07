import { Component, OnInit } from '@angular/core';
import { GetPaginatedResultQuery } from 'src/app/queries/GetPaginatedResultQuery';
import { ProductToShow } from 'src/app/response/ProductToShow';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { SplitnameService } from 'src/app/services/splitname.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  ngOnInit(): void {
    this.getAllProducts();
  }
  constructor(private httpClient:HttpServiceService,
    private splitNameService:SplitnameService){}
  tempTotalPages:number = 0;
  tempPageNumber:number = 1;
  hasPrevious:boolean = false;
  hasNext:boolean= false;
  tempPagesSize:number = 10;
  products:ProductToShow[] = [];
  productsCopy:ProductToShow[]=[];
  query:GetPaginatedResultQuery ={
    pageNumber:1,
    pageSize:10
  }
  pageArray:number[] = [];
  valued:string ="";
  async getAllProducts(){
    this.httpClient.getPaginatedProductsResult(this.query).subscribe({
      next: result =>{
        this.tempTotalPages = result.totalPages;
        result.elements.forEach(p => {
          this.products.push(this.splitNameService.splitName(p));
        })
        this.productsCopy =[...this.products];
        this.tempTotalPages = result.totalPages;
        this.hasPrevious = result.hasPreviousPage;
        this.hasNext=result.hasNextPage;
        this.pageArray = Array(this.tempTotalPages).fill(1).map((x,i)=> i+1);
      }
    })
  }

  public sendQueryPageSize(pageSize:number):void{
    let query ={
      pageNumber:1,
      pageSize:pageSize
    }
    this.httpClient.getPaginatedProductsResult(query)
    .subscribe(paginatedProductsResult =>{
      this.products= [];
      paginatedProductsResult.elements.forEach(p => {
        this.products.push(this.splitNameService.splitName(p));
      })
      this.productsCopy =[...this.products];
      this.tempTotalPages = paginatedProductsResult.totalPages;
      this.tempPagesSize = pageSize;
      this.hasPrevious = paginatedProductsResult.hasPreviousPage;
      this.hasNext=paginatedProductsResult.hasNextPage;
      this.pageArray = Array(this.tempTotalPages).fill(1).map((x,i)=> i+1);
    })
  }

  public filterByMonster():void{

    this.products = [...this.productsCopy];
    this.products =  this.products.filter(p => p.category === "Monster")
  }

  public filterByMagicSpell():void{

    this.products = [...this.productsCopy];
    this.products = this.products.filter(p => p.category === "Magic/Spell")
  }
  public filterByAll():void{
    this.products = [...this.productsCopy];
  }

  public goToPage(page:number):void{

    let query ={
      pageSize :this.tempPagesSize,
      pageNumber: page
    }
    this.httpClient.getPaginatedProductsResult(query)
    .subscribe({
      next: result =>{

        this.products = []
        this.productsCopy = []
        result.elements.forEach(p => {
          this.products.push(this.splitNameService.splitName(p));
          this.productsCopy.push(this.splitNameService.splitName(p));
        })
      }
    })
  }
}
