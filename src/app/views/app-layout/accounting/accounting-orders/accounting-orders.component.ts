import { Component } from '@angular/core';
import { SalesService } from '../../../../services/sales.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-accounting-orders',
  templateUrl: './accounting-orders.component.html',
  styleUrl: './accounting-orders.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class AccountingOrdersComponent {
  isAddSale: boolean = false;
  calender:any;
  orderDetail:boolean = false;
  saleDetailHeader = ['time', 'product', 'quantity', 'saleAmount']
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

  sales:any;
  expandedSales: Set<number> = new Set();
  salesForm:any;
  isSubmitted: boolean = false;
  loading: boolean = false;
  products:any;
  pageLoading: boolean = false;


  constructor(private salesService: SalesService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private api:HttpServiceService){
    this.salesForm = this.fb.group({
      // Sale Information
      date: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],

      // Sale Details
      product: ['', Validators.required],  // Not required by default
      quantity: ['', Validators.required],  // Not required by default
    });

    this.sales = [
      {
        "Name": "Milk Pack",
        "BuyingPrice": 500,
        "Quantity": 50,
        "ThresholdValue": 10,
        "ExpiryDate": "2024-12-30",
        "SKU": "MIL-001",
        "Availability": "In Stock"
      },
      {
        "Name": "Egg Carton",
        "BuyingPrice": 1500,
        "Quantity": 20,
        "ThresholdValue": 5,
        "ExpiryDate": "2025-01-10",
        "SKU": "EGG-002",
        "Availability": "In Stock"
      },
      {
        "Name": "Bread Loaf",
        "BuyingPrice": 300,
        "Quantity": 100,
        "ThresholdValue": 20,
        "ExpiryDate": "2024-12-25",
        "SKU": "BRD-003",
        "Availability": "In Stock"
      },
      {
        "Name": "Butter",
        "BuyingPrice": 1200,
        "Quantity": 10,
        "ThresholdValue": 2,
        "ExpiryDate": "2025-02-15",
        "SKU": "BUT-004",
        "Availability": "Low Stock"
      },
      {
        "Name": "Cheese Block",
        "BuyingPrice": 2500,
        "Quantity": 5,
        "ThresholdValue": 3,
        "ExpiryDate": "2024-11-20",
        "SKU": "CHS-005",
        "Availability": "Low Stock"
      }
    ]
  }


  ngOnInit(){
    this.getSales()
    this.getProducts()
  }

  toggleAddSale(){
    this.isAddSale =!this.isAddSale;
  }

  toggleExpand(index: number) {
    if (this.expandedSales.has(index)) {
      this.expandedSales.delete(index);
    } else {
      this.expandedSales.add(index);
    }
  }

  toggleCalender(){
    this.calender = !this.calender;
  }

  getSales(){
    this.pageLoading = true;
    this.api.get('sales').subscribe(
      res=>{
        this.sales = res;
        this.pageLoading = false;
        console.log('Sales Data', this.sales);
      },
      err=>{
        console.log(err)
        this.showError('Failed to load sales data');
      }
    )
  }

  getProducts(){
    this.api.get('products').subscribe(
      res =>{
        this.products = res
        this.products = this.products.data
        console.log('products', this.products)
      }
    )
  }

  toggleOrderDetail(){
    this.orderDetail = !this.orderDetail;
  }


  get f(){return this.salesForm.controls}

  saveSale() {
    this.isSubmitted = true;
    this.loading = true;

    if(this.salesForm.invalid){
      return;
    }

    this.api.post('sales', this.salesForm.value).subscribe(
      res=>{
        console.log(res)
        this.salesForm.reset();
        this.isAddSale = false;
        this.getSales()
        this.showSuccess('Sale added successfully');
      },
      err=>{
        console.log(err)
        this.showError('Failed to add sale');
      }
    )
  }

  isLast(item: string, list: string[]): boolean {
    return list.indexOf(item) === list.length - 1;
  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
