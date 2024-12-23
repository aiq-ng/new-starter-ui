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
import { CustomersComponent } from './sales/customers/customers.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HumanResourcesComponent } from './human-resources/human-resources.component';
import { ReportsComponent } from './reports/reports.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { QouteComponent } from './qoute/qoute.component';
import { OverviewComponent } from './accounting/overview/overview.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ProchurementOverviewComponent } from './prochurement-overview/prochurement-overview.component';
import { CreateNewItemPageComponent } from './inventory-tracker/create-new-item-page/create-new-item-page.component';
import { ItemDetailComponent } from './inventory-tracker/item-detail/item-detail.component';
import { EditItemComponent } from './inventory-tracker/edit-item/edit-item.component';
import { CreateNewPurchaseOrderComponent } from './purchases/create-new-purchase-order/create-new-purchase-order.component';
import { PurchaseOrderPreviewComponent } from './purchases/purchase-order-preview/purchase-order-preview.component';
import { CreateVendorComponent } from './vendors/create-vendor/create-vendor.component';
import { AccountingOrdersComponent } from './accounting/accounting-orders/accounting-orders.component';
import { AccountingProchurementComponent } from './accounting/accounting-prochurement/accounting-prochurement.component';
import { AccountingVendorsComponent } from './accounting/accounting-vendors/accounting-vendors.component';
import { CreateProcurementComponent } from './accounting/create-procurement/create-procurement.component';
import { AccountingProcurementPreviewComponent } from './accounting/accounting-procurement-preview/accounting-procurement-preview.component';
import { VendorDetailComponent } from './vendors/vendor-detail/vendor-detail.component';
import { CreateStaffComponent } from './human-resources/create-staff/create-staff.component';
import { CreateDepartmentComponent } from './human-resources/create-department/create-department.component';
import { StaffProfileComponent } from './human-resources/staff-profile/staff-profile.component';
import { DepartmentsComponent } from './human-resources/departments/departments.component';
import { HrOverviewComponent } from './human-resources/hr-overview/hr-overview.component';
import { CustomersCreateComponent } from './sales/customers/customers-create/customers-create.component';
import { AdjustmentHistoryComponent } from './inventory-tracker/adjustment-history/adjustment-history.component';
import { SalesOverviewComponent } from './sales/sales-overview/sales-overview.component';
import { SalesOrderComponent } from './sales/sales-order/sales-order.component';
import { SalesOrderPreviewComponent } from './sales/sales-order-preview/sales-order-preview.component';
import { CustomerPreviewComponent } from './sales/customer-preview/customer-preview.component';
import { PriceListComponent } from './price-list/price-list.component';
import { CreatePriceListComponent } from './price-list/create-price-list/create-price-list.component';
import { EditPriceListComponent } from './price-list/edit-price-list/edit-price-list.component';
import { CreateSaleOrderComponent } from './sales/create-sale-order/create-sale-order.component';
import { AccountingOrderPreviewComponent } from './accounting/accounting-order-preview/accounting-order-preview.component';
import { CreateExpensesComponent } from './accounting/create-expenses/create-expenses.component';


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
    CreateVendorComponent,
    AccountingOrdersComponent,
    AccountingProchurementComponent,
    AccountingVendorsComponent,
    CreateProcurementComponent,
    AccountingProcurementPreviewComponent,
    VendorDetailComponent,
    CreateStaffComponent,
    CreateDepartmentComponent,
    StaffProfileComponent,
    DepartmentsComponent,
    HrOverviewComponent,
    CustomersCreateComponent,
    AdjustmentHistoryComponent,
    SalesOverviewComponent,
    SalesOrderComponent,
    SalesOrderPreviewComponent,
    CustomerPreviewComponent,
    PriceListComponent,
    CreatePriceListComponent,
    EditPriceListComponent,
    CreateSaleOrderComponent,
    AccountingOrderPreviewComponent,
    CreateExpensesComponent

  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule,
    FormsModule,
    QRCodeModule
  ]
})
export class AppLayoutModule { }
