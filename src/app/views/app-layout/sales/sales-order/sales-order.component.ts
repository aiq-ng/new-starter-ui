import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.scss'
})
export class SalesOrderComponent {


  inventoryData:any;
  @Output() viewAction = new EventEmitter();

  constructor(private router: Router){
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
