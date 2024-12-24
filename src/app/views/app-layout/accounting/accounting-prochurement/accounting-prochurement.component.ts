import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-accounting-prochurement',
  templateUrl: './accounting-prochurement.component.html',
  styleUrl: './accounting-prochurement.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class AccountingProchurementComponent {
        isAddSale: boolean = false;
          calender:any;
          orderDetail:boolean = false;
          orderInvoice:any;
          item_id:any;
          tableData:any;
          billsData:any;
          tableView:any = 'expenses';
          saleDetailHeader = ['Expenses', 'Bills']
          tableHeader = [
            "expense Id",
            "expense Title",
            "date",
            "Payment Method",
            "Category",
            "Department",
            "Amount",

          ]

          billsTableHeader = [
            "Ref Id",
            "Date",
            "Due Date",
            "Vendor's Name",
            "order Number",
            "Amount",
            "status",

          ]

          sales:any;
          expandedSales: Set<number> = new Set();
          salesForm:any;
          isSubmitted: boolean = false;
          loading: boolean = false;
          products:any;
          pageLoading: boolean = false;
          tabMenu = ['Expenses', 'Bills']



          constructor(
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
            this.getExpense(1)
            this.getProducts()
            this.getBills(1)
          }

          paginate(page:any){
            console.log('page', page)
            if(this.tableView=='expenses'){
              this.getExpense(page);
            }
            if(this.tableView=='bills'){
              this.getBills(page);
            }
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
            if(value.toLowerCase()=='expenses'){
              this.tableView = 'expenses';
            }else if(value.toLowerCase()=='bills'){
              this.tableView = 'bills'
            }else {
              this.tableView = 'expenses'
            }
          }

          getExpense(page:any){
            this.pageLoading= true;
            return this.api.get(`accounting/expenses?page=${page}&page_size=10`).subscribe(
              res =>{
                let response:any = res
                this.tableData = response
                console.log(this.sales)
                this.pageLoading=false;
              }, err=>{
                console.log(err)
                this.pageLoading=false;
              }
            )

          }


          getBills(page:any){
            this.pageLoading= true;
            return this.api.get(`accounting/bills?page=${page}&page_size=10&start_date=2022-01-01`).subscribe(
              res =>{
                let response:any = res
                this.billsData = response
                console.log(this.billsData)
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
                this.getExpense(1)
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
