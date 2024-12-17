import { PrimengModule } from './../../primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AppLayoutComponent } from './app-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryTrackerComponent } from './inventory-tracker/inventory-tracker.component';
import { MonthlyInventoryComponent } from './monthly-inventory/monthly-inventory.component';
import { SalesComponent } from './sales/sales.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AccountingComponent } from './accounting/accounting.component';
import { ProcurementComponent } from './procurement/procurement.component';
import { CustomersComponent } from './customers/customers.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HumanResourcesComponent } from './human-resources/human-resources.component';
import { ReportsComponent } from './reports/reports.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { QouteComponent } from './qoute/qoute.component';
import { OverviewComponent } from './overview/overview.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ProchurementOverviewComponent } from './prochurement-overview/prochurement-overview.component';
import { CreateNewItemPageComponent } from './inventory-tracker/create-new-item-page/create-new-item-page.component';
import { ItemDetailComponent } from './inventory-tracker/item-detail/item-detail.component';
import { EditItemComponent } from './inventory-tracker/edit-item/edit-item.component';
import { CreateNewPurchaseOrderComponent } from './purchases/create-new-purchase-order/create-new-purchase-order.component';
import { PurchaseOrderPreviewComponent } from './purchases/purchase-order-preview/purchase-order-preview.component';
import { CustomersOverviewComponent } from './customers/customers-overview/customers-overview.component';
import { CustomersCreateComponent } from './customers/customers-create/customers-create.component';
import { PriceListComponent } from './price-list/price-list.component';
import { CreatePriceListComponent } from './price-list/create-price-list/create-price-list.component';


@NgModule({
  declarations: [
    AppLayoutComponent,
    DashboardComponent,
    InventoryTrackerComponent,
    MonthlyInventoryComponent,
    SalesComponent,
    PurchasesComponent,
    AccountingComponent,
    ProcurementComponent,
    CustomersComponent,
    ExpensesComponent,
    HumanResourcesComponent,
    ReportsComponent,
    InvoiceComponent,
    QouteComponent,
    OverviewComponent,
    VendorsComponent,
    ProchurementOverviewComponent,
    CreateNewItemPageComponent,
    ItemDetailComponent,
    EditItemComponent,
    CreateNewPurchaseOrderComponent,
    PurchaseOrderPreviewComponent,
    CustomersOverviewComponent,
    CustomersCreateComponent,
    PriceListComponent,
    CreatePriceListComponent,

  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule,
    FormsModule,
    QRCodeModule
  ]
})
export class AppLayoutModule { }
