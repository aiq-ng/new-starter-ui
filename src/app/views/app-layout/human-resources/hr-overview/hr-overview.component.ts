import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-hr-overview',
  templateUrl: './hr-overview.component.html',
  styleUrl: './hr-overview.component.scss'
})
export class HrOverviewComponent {
  isAddSale: boolean = false;
  humanResourceData:any= [];
  tabMenu:any =[]
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
  metrics:any;
  employees:any =[];


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
    this.getMetrics()
    this.getDepartments();
    this.getEmployess('', 1)
  }

  paginate(page:any){
    console.log('page', page)
    this.getEmployess('', page);
  }

  filterEmployees(value:any){
    console.log(value)
    if(value=='All'){
      this.getEmployess('', 1)
    }else {
      this.getEmployess(value, 1)
    }
  }

  route(page:string){
    this.router.navigate([page]);
    console.log('routing')
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

  getMetrics(){
    this.loading = true;
    this.api.get('human-resources/overview').subscribe(
      res=>{
        this.metrics = res;
        this.loading = false;
      },
      err=>{
        console.log(err)
        this.showError('Failed to load sales data');
      }
    )
  }

  getDepartments(){
    this.loading = true;
    this.api.get('departments').subscribe(
      res=>{
         let response:any = res;
        for(let department of response.data){
          this.tabMenu.push(department.name)
          this.loading = false;
        }
      },
      err=>{
        console.log(err)
        this.showError('Failed to load sales data');
      }
    )
  }

  getEmployess(filterValue:string, page:any){
    this.pageLoading = true;
    this.api.get(`human-resources/employees?page=${page}&page_size=10&department=` + filterValue).subscribe(
      res =>{
        this.employees = res
        this.employees = this.employees
        console.log('employess', this.employees)
        this.pageLoading = false;
      }
    )
  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
