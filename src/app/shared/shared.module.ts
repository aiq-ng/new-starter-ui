import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SearchUploadHeaderComponent } from './search-upload-header/search-upload-header.component';
import { ButtonComponent } from './button/button.component';
import { TagComponent } from './tag/tag.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { ItemListComponent } from './item-list/item-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ToastComponent } from './toast/toast.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CreateNewInventoryPlanComponent } from './create-new-inventory-plan/create-new-inventory-plan.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { TableComponent } from './table/table.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SalesOrderInvoiceComponent } from './sales-order-invoice/sales-order-invoice.component';
import { ConfirmActionComponent } from './confirm-action/confirm-action.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SearchUploadHeaderComponent,
    ButtonComponent,
    TagComponent,
    SubHeaderComponent,
    ProductCardComponent,
    SubMenuComponent,
    ItemListComponent,
    PaginationComponent,
    ToastComponent,
    CreateProductComponent,
    EmptyListComponent,
    SpinnerComponent,
    CreateNewInventoryPlanComponent,
    MobileMenuComponent,
    SidebarComponent,
    TabMenuComponent,
    TableComponent,
    OrderDetailComponent,
    InvoiceComponent,
    SalesOrderInvoiceComponent,
    ConfirmActionComponent,
    ConfirmDeleteComponent,

  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule

  ],
  exports: [
    HeaderComponent,
    SearchUploadHeaderComponent,
    TagComponent,
    SubHeaderComponent,
    ProductCardComponent,
    SubMenuComponent,
    ItemListComponent,
    PaginationComponent,
    ToastComponent,
    CreateProductComponent,
    EmptyListComponent,
    SpinnerComponent,
    CreateNewInventoryPlanComponent,
    SidebarComponent,
    TabMenuComponent,
    TableComponent,
    OrderDetailComponent,
    InvoiceComponent,
    SalesOrderInvoiceComponent,
    ConfirmActionComponent,
    ConfirmDeleteComponent,

  ]
})
export class SharedModule {
  constructor(){
    console.log('SharedModule loaded');
  }
}
