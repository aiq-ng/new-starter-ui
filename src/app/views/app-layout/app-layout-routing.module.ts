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
import { CustomersComponent } from './sales/customers/customers.component';
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
import { CreateDepartmentComponent } from './human-resources/create-department/create-department.component';
import { CreateStaffComponent } from './human-resources/create-staff/create-staff.component';
import { StaffProfileComponent } from './human-resources/staff-profile/staff-profile.component';
import { HrOverviewComponent } from './human-resources/hr-overview/hr-overview.component';
import { CustomersCreateComponent } from './sales/customers/customers-create/customers-create.component';
import { SalesOverviewComponent } from './sales/sales-overview/sales-overview.component';
import { SalesOrderComponent } from './sales/sales-order/sales-order.component';
import { SalesOrderPreviewComponent } from './sales/sales-order-preview/sales-order-preview.component';
import { CustomerPreviewComponent } from './sales/customer-preview/customer-preview.component';
import { PriceListComponent } from './price-list/price-list.component';
import { CreatePriceListComponent } from './price-list/create-price-list/create-price-list.component';
import { EditPriceListComponent } from './price-list/edit-price-list/edit-price-list.component';
import { CreateSaleOrderComponent } from './sales/create-sale-order/create-sale-order.component';
import { CreateExpensesComponent } from './accounting/create-expenses/create-expenses.component';
import { AccountingOrderPreviewComponent } from './accounting/accounting-order-preview/accounting-order-preview.component';


const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'order/invoice', component: SalesOrderInvoiceComponent },

      { path: 'accounting', component: AccountingComponent, children: [
        {path: 'overview', component: OverviewComponent},
        {path: 'order', component: AccountingOrdersComponent},
        {path: 'prochurement', component: AccountingProchurementComponent},
        {path: 'orders', component: AccountingOrdersComponent},
        {path: 'vendors', component: AccountingVendorsComponent},
        {path: 'new-procurement', component: CreateProcurementComponent},
        {path: 'create-expenses', component: CreateExpensesComponent},
        {path: 'preview/:id', component: AccountingOrderPreviewComponent},
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
        { path: 'vendor-detail/:id', component: VendorDetailComponent},
        { path: 'create-vendor', component: CreateVendorComponent},
      ] },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'sales', component: SalesComponent, children: [
        { path: 'overview', component: SalesOverviewComponent },
        { path: 'create-sale-order', component: CreateSaleOrderComponent },
        { path: 'orders', component: SalesOrderComponent },
        { path: 'orders-preview/:id', component: SalesOrderPreviewComponent },
        { path: 'customers', component: CustomersComponent },
        { path: 'create-customer', component: CustomersCreateComponent },
        { path: 'customers-preview/:id', component: CustomerPreviewComponent },
        { path: 'price-list', component: PriceListComponent },
        { path: 'create-price-list', component: CreatePriceListComponent },
        { path: 'edit-price-list/:id', component: EditPriceListComponent },

      ] },
      { path: 'human-resources', component: HumanResourcesComponent, children: [
        {path: '', component: HrOverviewComponent },
        {path: 'create-department', component: CreateDepartmentComponent },
        {path: 'add-employee', component: CreateStaffComponent },
        {path: 'employee-profile/:id', component: StaffProfileComponent },
      ] },
      { path: 'qoute', component: QouteComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
