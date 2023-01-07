import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { IndexComponent } from './components/index/index.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full' },
  {path:'index', component:IndexComponent},
  {path:'products', component:ProductsComponent},
  {path: 'shopping-cart', component:ShoppingCartComponent},
  {path: 'purchases', component:PurchasesComponent},
  {path: 'product/:id', component:ProductDetailsComponent},
  {path: 'createProduct/:id', component:AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
