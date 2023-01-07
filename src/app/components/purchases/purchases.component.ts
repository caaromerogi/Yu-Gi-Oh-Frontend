import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/response/Purchase';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { SplitnameService } from 'src/app/services/splitname.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit{
  ngOnInit(): void {
    this.getAllPurchases();
  }
  constructor(private httpService:HttpServiceService,
    public splitService:SplitnameService){
  }
  purchases:Purchase[] = []

  async getAllPurchases(){
    let query ={}
    this.httpService.getAllPurchases(query)
    .subscribe({
      next:result =>{
        this.purchases = result
      }
    })
  }
}
