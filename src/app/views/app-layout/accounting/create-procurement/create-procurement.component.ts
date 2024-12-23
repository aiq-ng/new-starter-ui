import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-procurement',
  templateUrl: './create-procurement.component.html',
  styleUrl: './create-procurement.component.scss',
  providers: [MessageService]
})
export class CreateProcurementComponent {
  createExpenseForm:any;
  paymentMethod:any;
  departments:any;
  vendors:any;
  expenseCategory:any;
  pageLoading:boolean = false;
  loading:boolean = false;
  isSubmitted:boolean = false;

  constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService: MessageService){}


  ngOnInit(){

    this.createExpenseForm = this.fb.group({
      expense_title: ['', Validators.required],
      expense_category: ['', Validators.required],
      payment_method_id: ['', Validators.required],
      department_id: ['', Validators.required],
      amount: ['', Validators.required],
      bank_charges: ['', Validators.required],
      date_of_expense: ['', Validators.required],
      notes: ['', Validators.required],

    })

    this.getDepartment()
    this.getExpenseCategory()
    this.getPaymentMethod()
    this.getVendors()
  }

  goBack(){
    window.history.back();
  }

  getDepartment(){
    this.pageLoading = true;
    this.api.get('departments').subscribe(
      res=>{
        this.departments = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
      }
    )
  }

  getExpenseCategory(){
    this.pageLoading = true;
    this.api.get('expenses_categories').subscribe(
      res=>{
        this.expenseCategory = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
      }
    )
  }

  getPaymentMethod(){
    this.pageLoading = true;
    this.api.get('payment_methods').subscribe(
      res=>{
        this.paymentMethod = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
      }
    )
  }

  getVendors(){
    this.pageLoading = true;
    this.api.get('vendors').subscribe(
      res=>{
        this.vendors = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
      }
    )
  }

  get f(){return this.createExpenseForm.controls}

  saveExpense(){
    this.loading = true;
    this.isSubmitted = true;
    console.log(this.createExpenseForm.value)

    if(this.createExpenseForm.invalid){
      this.loading = false;
      this.showError('One or more fields is required')
      return;
    }


    this.api.post('accounting/expenses', this.createExpenseForm.value).subscribe(
      res=>{
        this.loading = false;
        this.showSuccess('Expense saved successfully')
        this.createExpenseForm.reset();
        this.isSubmitted=false;
      },
      err=>{
        this.loading = false;
        this.showError('An error occurred while saving the expense')
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
