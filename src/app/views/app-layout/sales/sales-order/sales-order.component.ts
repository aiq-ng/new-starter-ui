

import { Component, Output, EventEmitter } from '@angular/core';
import { SalesService } from '../../../../services/sales.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent {

  orders: Order[] = []; // Holds the orders data
  currentPage: number = 1;
  totalPages: number = 1;
  inventoryData: any;
  SalesOrder: any;
  pageLoading: boolean = false;
  @Output() viewAction = new EventEmitter();

  activeTab: string = 'allOrders'; 
  pages: number[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: HttpServiceService,
    private messageService: MessageService,
  ) {
    this.generatePages();
  }

  tableHeader = [
    "Id",
    "Order Id",
    "Order",
    "Quantity",
    "Customer Name",
    "Date",
    "Order Type",
    "Amount",
    "Status"
  ];

  

  ngOnInit() {
    this.getSalesOrder();
  }

  // Fetch Sales Orders
  getSalesOrder(page: number = 1) {
    this.pageLoading = true;
    this.api.get('sales/orders?page=1&page_size=10&status=&order_type=order&start_date=2024-11-27&end_date')
      .subscribe(
       (res:any) => {
          this.SalesOrder = res.data;
          this.currentPage = res.meta.current_page;
          this.totalPages = res.meta.total_pages;
          console.log(this.SalesOrder);
          this.pageLoading = false;
          this.generatePages(); // Re-generate pages
       },
         (err) => {
          console.log(err);
          this.showError('Failed to load sales data');
          this.pageLoading = false;
        }
      );
  }

  // Generate page numbers
  generatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Handle page change
  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getSalesOrder(page);
    }
  }

  // View Action
  onClick() {
    this.viewAction.emit();
    console.log('View action triggered');
  }

  // Success and Error Messages
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  // Switch Tabs
  switchTab(tab: string) {
    this.activeTab = tab;
  }

  // Utility Function
  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  // Navigate Route
  route(path: string) {
    this.router.navigateByUrl(path);
  }
}

// Interfaces
interface Order {
  id: number;
  order_id: string;
  order_title: string;
  quantity: number;
  customer_name: string;
  date: string;
  order_type: string;
  amount: string;
  status: string;
}

interface Meta {
  current_page: number;
  next_page: number;
  page_size: number;
  total_data: number;
  total_pages: number;
}

interface ApiResponse {
  message: string;
  data: Order[];
  meta: Meta;
}
