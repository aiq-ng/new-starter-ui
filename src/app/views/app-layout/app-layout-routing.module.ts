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
import { OverviewComponent } from './accounting/overview/overview.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ProchurementOverviewComponent } from './prochurement-overview/prochurement-overview.component';
import { CreateNewItemPageComponent } from './inventory-tracker/create-new-item-page/create-new-item-page.component';
import { ItemDetailComponent } from './inventory-tracker/item-detail/item-detail.component';
import { EditItemComponent } from './inventory-tracker/edit-item/edit-item.component';
import { CreateNewPurchaseOrderComponent } from './purchases/create-new-purchase-order/create-new-purchase-order.component';
import { PurchaseOrderPreviewComponent } from './purchases/purchase-order-preview/purchase-order-preview.component';
import { CreateVendorComponent } from './vendors/create-vendor/create-vendor.component';
import { AccountingProchurementComponent } from './accounting/accounting-prochurement/accounting-prochurement.component';
import { AccountingOrdersComponent } from './accounting/accounting-orders/accounting-orders.component';
import { AccountingVendorsComponent } from './accounting/accounting-vendors/accounting-vendors.component';
import { OrderDetailComponent } from '../../shared/order-detail/order-detail.component';
import { SalesOrderInvoiceComponent } from '../../shared/sales-order-invoice/sales-order-invoice.component';
import { CreateProcurementComponent } from './accounting/create-procurement/create-procurement.component';
import { AccountingProcurementPreviewComponent } from './accounting/accounting-procurement-preview/accounting-procurement-preview.component';
import { VendorDetailComponent } from './vendors/vendor-detail/vendor-detail.component';


const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'order/invoice', component: SalesOrderInvoiceComponent },
      { path: 'accounting', component: AccountingComponent, children: [
        {path: 'overview', component: OverviewComponent},
        {path: 'order', component: AccountingOrdersComponent},
        {path: 'prochurement', component: AccountingProchurementComponent},
        {path: 'orders', component: AccountingOrdersComponent},
        {path: 'vendors', component: AccountingVendorsComponent},
        {path: 'new-procurement', component: CreateProcurementComponent},
        {path: 'preview/:id', component: AccountingProcurementPreviewComponent},
        // {path: 'vendors', component: SalesComponent},
      ] },
      { path: 'prochurement', component: ProcurementComponent, children: [
        {path: 'overview', component: ProchurementOverviewComponent},
        { path: 'purchases', component: PurchasesComponent },
        { path: 'purchase-order-preview/:id', component: PurchaseOrderPreviewComponent},
        { path: 'inventory', component: InventoryTrackerComponent },
        { path: 'create-new-item', component: CreateNewItemPageComponent },
        { path: 'create-new-purchase', component: CreateNewPurchaseOrderComponent },
        { path: 'edit-item/:id', component: EditItemComponent },
        { path: 'items/:id', component: ItemDetailComponent },
        { path: 'vendors', component: VendorsComponent },
        { path: 'vendor-detail', component: VendorDetailComponent},
        { path: 'create-vendor', component: CreateVendorComponent},
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
