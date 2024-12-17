import { Component } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class VendorsComponent {
  isAddSale: boolean = false;
  saleDetailHeader = ['time', 'product', 'quantity', 'saleAmount']
  tableHeader = [
    "Name",
    "Category",
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
  vendors:any;


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
    this.getVendors()
    this.vendors = [
      {
        name: "John Doe",
        category: "Supplier",
        email: "john.doe@example.com",
        workPhone: "+1 234-567-8901",
        address: "123 Elm Street, Springfield, USA",
        transaction: "$5,000.00",
        status: "Active",
      },
      {
        name: "Jane Smith",
        category: "Customer",
        email: "jane.smith@example.com",
        workPhone: "+44 20 7946 0958",
        address: "45 Baker Street, London, UK",
        transaction: "$1,200.00",
        status: "Pending",
      },
      {
        name: "Michael Brown",
        category: "Vendor",
        email: "michael.brown@example.com",
        workPhone: "+61 7 3123 4567",
        address: "78 King Street, Brisbane, Australia",
        transaction: "$2,800.00",
        status: "Inactive",
      },
      {
        name: "Emma Wilson",
        category: "Partner",
        email: "emma.wilson@example.com",
        workPhone: "+91 98765 43210",
        address: "56 MG Road, Bengaluru, India",
        transaction: "$3,450.00",
        status: "Active",
      },
      {
        name: "Robert Johnson",
        category: "Investor",
        email: "robert.johnson@example.com",
        workPhone: "+81 90-1234-5678",
        address: "12 Tokyo Tower Avenue, Tokyo, Japan",
        transaction: "$9,000.00",
        status: "Pending",
      },
    ];

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

  getVendors(){
    this.pageLoading = true;
    this.api.get('vendors?page=1&page_size=5&sort_by=total_transaction&sort_order=desc').subscribe(
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
        this.getVendors()
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
