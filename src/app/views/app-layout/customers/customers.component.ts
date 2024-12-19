import { Component, EventEmitter, Output } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../services/http-service.service';
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
  customers: Customer[] =[];
  customerData:any[] = [];
  pages: number[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  sales:any;
  expandedSales: Set<number> = new Set();
  salesForm:any;
  isSubmitted: boolean = false;
  loading: boolean = false;
  products:any;
  pageLoading: boolean = false;
  inventoryData:any;
  @Output() viewAction = new EventEmitter();


  constructor(private salesService: SalesService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private router: Router,
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

  
  
  route(arg0: string) {
    this.router.navigateByUrl(arg0);
    // throw new Error('Method not implemented.');
    }


  ngOnInit(){
    this.getSales();
    this.getProducts();
    this.getCustomers();
    this.generatePages();

    this.inventoryData = [
        {
          Name: "John Doe",
          CompanyName: "TechCorp Inc.",
          Email: "john.doe@example.com",
          WorkPhone: "555-123-4567",
          Address: "123 Elm Street, Springfield",
          Transaction: "$1500",
          Status: "Paid"
        },
        {
          Name: "Jane Smith",
          CompanyName: "Innovate Solutions",
          Email: "jane.smith@example.com",
          WorkPhone: "555-987-6543",
          Address: "456 Maple Avenue, Lakeside",
          Transaction: "$1200",
          Status: "Owing"
        },
        {
          Name: "Carlos Mendoza",
          CompanyName: "GreenFields Ltd.",
          Email: "carlos.mendoza@example.com",
          WorkPhone: "555-555-7890",
          Address: "789 Oak Drive, Rivertown",
          Transaction: "$3000",
          Status: "Paid"
        },
        {
          Name: "Emily Johnson",
          CompanyName: "Johnson Enterprises",
          Email: "emily.j@example.com",
          WorkPhone: "555-444-3210",
          Address: "321 Pine Lane, Hillcrest",
          Transaction: "$500",
          Status: "Owing"
        },
        {
          Name: "Michael Brown",
          CompanyName: "Brown Logistics",
          Email: "michael.brown@example.com",
          WorkPhone: "555-222-6789",
          Address: "222 Birch Way, Eastwood",
          Transaction: "$2500",
          Status: "Paid"
        }  
    ]
  }

  objectKeys(obj: any){
    return Object.keys(obj  )
  }

  onClick(){
    this.viewAction.emit();
    console.log('view action triggered')
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

  getSales(){
    this.pageLoading = true;
    this.api.get('sales').subscribe(
      res=>{
        this.sales = res;
        this.pageLoading = false;
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

  getCustomers(page: number = 1) {
    this.pageLoading = true;
    this.api.get('customers?page=1&page_size=10&status=&order_type=order&start_date=2024-11-27&end_date')
      .subscribe(
       (res:any) => {
          this.customerData = res.data;
          this.currentPage = res.meta.current_page;
          this.totalPages = res.meta.total_pages;
          console.log(this.customerData);
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
      this.getCustomers(page);
    }
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

// Interfaces
interface Customer {
  id: number;
  name: string;
  company_name: string;
  email: number;
  work_phone: string;
  address: string;
  total_transaction: string;
  balance: string;
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
  data: Customer[];
  meta: Meta;
}