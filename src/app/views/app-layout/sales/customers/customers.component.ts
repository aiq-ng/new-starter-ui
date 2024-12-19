import { Component, EventEmitter, Output } from '@angular/core';
import { SalesService } from '../../../../services/sales.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class CustomersComponent {
  isAddSale: boolean = false;
  saleDetailHeader = ['time', 'product', 'quantity', 'saleAmount']
  tableHeader = [
    "Name",
    "Company Name",
    "Email",
    "Work Phone",
    "Address",
    "Transaction",
    "Status"

  ]

  sales:any;
  expandedSales: Set<number> = new Set();
  salesForm:any;
  isSubmitted: boolean = false;
  loading: boolean = false;
  products:any;
  pageLoading: boolean = false;
  vendors:any =[];
  branches:any;
  currencies:any;
  paymentTerms:any;


  constructor(private salesService: SalesService,
              private fb: FormBuilder,
              private router: Router,
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
    this.getCustomers()


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

  getCustomers(){
    this.pageLoading = true;
    this.api.get('customers?page=1&page_size=10&sort_by=total_transaction&sort_order=desc&status').subscribe(
      res=>{
        this.vendors = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
        this.showError('Failed to load sales data');
      }
    )
  }



  route(page:string){
    console.log('route clicked')
    this.router.navigateByUrl(page)
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
        this.getCustomers()
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
