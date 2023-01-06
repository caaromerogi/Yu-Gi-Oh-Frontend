import { Component, OnInit } from '@angular/core';
import { GetPaginatedResultQuery } from 'src/app/queries/GetPaginatedResultQuery';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  ngOnInit(): void {
    this.getAllProducts();
  }
  constructor(private httpClient:HttpServiceService){}

  query:GetPaginatedResultQuery ={
    pageNumber:1,
    pageSize:10
  }

  async getAllProducts(){
    this.httpClient.getPaginatedProductsResult(this.query).subscribe({
      next: result =>{
        console.log(result)
      }
    })
  }
}
