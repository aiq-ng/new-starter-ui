import { SalesComponent } from './sales/sales.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryTrackerComponent } from './inventory-tracker/inventory-tracker.component';
import { MonthlyInventoryComponent } from './monthly-inventory/monthly-inventory.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { AccountingComponent } from './accounting/accounting.component';
import { ProcurementComponent } from './procurement/procurement.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { CustomersComponent } from './customers/customers.component';
import { HumanResourcesComponent } from './human-resources/human-resources.component';
import { ReportsComponent } from './reports/reports.component';
import { QouteComponent } from './qoute/qoute.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OverviewComponent } from './overview/overview.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ProchurementOverviewComponent } from './prochurement-overview/prochurement-overview.component';
import { CreateNewItemPageComponent } from './inventory-tracker/create-new-item-page/create-new-item-page.component';
import { ItemDetailComponent } from './inventory-tracker/item-detail/item-detail.component';


const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'accounting', component: AccountingComponent, children: [
        {path: 'overview', component: OverviewComponent},
        {path: 'sales-order', component: SalesComponent},
      ] },
      { path: 'prochurement', component: ProcurementComponent, children: [
        {path: 'overview', component: ProchurementOverviewComponent},
        { path: 'purchases', component: PurchasesComponent },
        { path: 'inventory', component: InventoryTrackerComponent },
        { path: 'create-new-item', component: CreateNewItemPageComponent },
        { path: 'items/:id', component: ItemDetailComponent },
        { path: 'vendors', component: VendorsComponent },
      ] },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'human-resources', component: HumanResourcesComponent },
      { path: 'qoute', component: QouteComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'reports', component: ReportsComponent },
    ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
