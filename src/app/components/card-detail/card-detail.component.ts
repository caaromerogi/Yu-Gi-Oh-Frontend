import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductToShow } from 'src/app/response/ProductToShow';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(private router:Router,
    private httpService:HttpServiceService){}
  @Input() product?:ProductToShow;

  public goToProductDetails(id:number){
    this.router.navigateByUrl(`product/${id}`);
  }

}
