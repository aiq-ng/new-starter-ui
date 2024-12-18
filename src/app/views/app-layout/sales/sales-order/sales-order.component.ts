import { Component, Output, EventEmitter } from '@angular/core';
import { SalesService } from '../../../../services/sales.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.scss'
})
export class SalesOrderComponent {


  inventoryData:any;
  SalesOrder: any=null;
  pageLoading:boolean=false;
  @Output() viewAction = new EventEmitter();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: HttpServiceService,
    private messageService: MessageService,
  ){
    this.generatePages();
  }
  tableHeader = [
    "Order Id",
    "Order",
    "Quantity",
    "Customer Name",
    "Date",
    "Order Type",
    "Amount",
    "Status"
  ]

  objectKeys(obj: any){
    return Object.keys(obj  )
  }

  onClick(){
    this.viewAction.emit();
    console.log('view action triggered')
  }
  route(arg0: string) {
    this.router.navigateByUrl(arg0);
    // throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
  
    this.inventoryData = [
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: "Paid"
      },
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: "Pending"
      },
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: "Paid"
      },
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: "Pending"
      },
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: "Paid"
      }, 
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: 'Upcoming'
      },
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: "Paid"
      }, 
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: 'Upcoming'
      },
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: "Paid"
      }, 
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: 'Upcoming'
      },
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: "Paid"
      }, 
      {
        OrderId: "SLS-654",
        Order: "Chicken Jumbo Pack",
        Quantity: "12",
        CustomerName: "Mr&Mrs Augustine",
        Date: "October 30, 2024",
        OrderType: "Service",
        Amount: "750,000",
        Status: 'Upcoming'
      }
  ]
  }
  
  getSalesOrder(){
    this.pageLoading = true;
    this.api.get('sales/orders?page=1&page_size=10&status=&order_type=order&start_date=2024-11-27&end_date').subscribe(
      res=>{
        this.SalesOrder = res
        console.log(this.SalesOrder)
        this.pageLoading = false;
      }
    )
  }

  activeTab: string = 'allOrders'; 
  switchTab(tab: string) {
    this.activeTab = tab;
  }

  currentPage: number = 1; // Active page
  totalPages: number = 10; // Total number of pages
  pages: number[] = [];

 

  

  // Generate page numbers
  generatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Handle page change
  onPageChange(page: number) {
    const pageNumber = Number(page);
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
  
}
