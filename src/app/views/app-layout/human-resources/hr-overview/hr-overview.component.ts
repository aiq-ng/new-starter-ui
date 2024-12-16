import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-hr-overview',
  templateUrl: './hr-overview.component.html',
  styleUrl: './hr-overview.component.scss'
})
export class HrOverviewComponent {
  isAddSale: boolean = false;
  humanResourceData:any= [];
  tabMenu=['All', 'sell', 'riders', 'receptionists', 'accountants', 'store keepers']
  saleDetailHeader = ['time', 'product', 'quantity', 'saleAmount']
  tableHeader = [
    "Name",
    "Department",
    "Salaries",
    "Bank Details",
    "Leave",

  ]

  createDepartment:any;
  departments:any;
  expandedSales: Set<number> = new Set();
  salesForm:any;
  isSubmitted: boolean = false;
  loading: boolean = false;
  products:any;
  pageLoading: boolean = false;


  constructor(
              private fb: FormBuilder,
              private messageService: MessageService,
              private api:HttpServiceService,
              private router:Router){
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
    this.humanResourceData = [
      {
        Name: "John Doe",
        Department: "Human Resources",
        Salaries: "$5,000",
        "Bank Details": "Bank of America, Account: 1234567890",
        Leave: "5 days remaining",
      },
      {
        Name: "Jane Smith",
        Department: "Finance",
        Salaries: "$6,500",
        "Bank Details": "Chase Bank, Account: 0987654321",
        Leave: "10 days remaining",
      },
      {
        Name: "Michael Brown",
        Department: "IT",
        Salaries: "$7,200",
        "Bank Details": "Wells Fargo, Account: 1122334455",
        Leave: "2 days remaining",
      },
      {
        Name: "Emily Davis",
        Department: "Marketing",
        Salaries: "$5,800",
        "Bank Details": "Citibank, Account: 6677889900",
        Leave: "8 days remaining",
      },
      {
        Name: "Chris Wilson",
        Department: "Operations",
        Salaries: "$6,000",
        "Bank Details": "HSBC, Account: 5566778899",
        Leave: "15 days remaining",
      },
    ];

    this.getSales()
    this.getProducts()
  }

  route(page:string){
    this.router.navigate([page]);
  }
  toggleCreateDepartment(){
    this.createDepartment =!this.createDepartment;
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
    this.api.get('departments').subscribe(
      res=>{
        this.departments = res;
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
