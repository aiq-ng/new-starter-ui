import { SalesComponent } from './sales/sales.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { InventoryTrackerComponent } from './inventory-tracker/inventory-tracker.component';
import { MonthlyInventoryComponent } from './monthly-inventory/monthly-inventory.component';
import { PurchasesComponent } from './purchases/purchases.component';


const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent },
      {path: 'products', component: ProductsComponent },
      {path: 'product/:id', component: ProductDetailComponent },
      {path: 'inventory-tracker', component: InventoryTrackerComponent },
      {path: 'monthly-inventory/:id', component: MonthlyInventoryComponent },
      {path: 'sales', component: SalesComponent },
      {path: 'purchases', component: PurchasesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
