import { Component } from '@angular/core';
import { SalesService } from '../../../../services/sales.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

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
  orderInvoice:any;
  item_id:any;
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
  tabMenu = ['All','Sent', 'Completed', 'Services', 'Upcoming', 'Cancel']



  constructor(private salesService: SalesService,
              private fb: FormBuilder,
              private router:Router,
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


  }


  ngOnInit(){
    this.getSales('', '')
    this.getProducts()
  }

  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.item_id = segments[segments.length - 1];

    return this.item_id;
  }

  getSalesInvoice(id:any){
    this.pageLoading= true;
    return this.api.get('sales/orders/invoice/' + id).subscribe(
      res =>{
        let response:any = res
        this.orderInvoice = response.data
        console.log(this.orderInvoice)
        this.pageLoading=false;
      }, err=>{
        console.log(err)
        this.pageLoading=false;
      }
    )

  }


  filterInventory(value:any){
    console.log(value.toLowerCase())
    if(value=='All'){
      this.getSales('', '')
    }else if(value=='Services'){
      this.getSales('', value.toLowerCase())
    }else {
      this.getSales(value.toLowerCase(), '')
    }
  }

  getSales(status:string, order_type:string){
    this.pageLoading= true;
    return this.api.get(`sales/orders?page=1&page_size=10&status=${status}&order_type=${order_type}&start_date=&end_date`).subscribe(
      res =>{
        let response:any = res
        this.sales = response.data
        console.log(this.sales)
        this.pageLoading=false;
      }, err=>{
        console.log(err)
        this.pageLoading=false;
      }
    )

  }

  confirmPayment(){}

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

  getProducts(){
    this.api.get('products').subscribe(
      res =>{
        this.products = res
        this.products = this.products.data
        console.log('products', this.products)
      }
    )
  }

  toggleOrderDetail(id:any){
    this.orderDetail = !this.orderDetail;
    this.getSalesInvoice(id)
  }

  route(page:string){
    this.router.navigate([page]);
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
        this.getSales('', '')
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
