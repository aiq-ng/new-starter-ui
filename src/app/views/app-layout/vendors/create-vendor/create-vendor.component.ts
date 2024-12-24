import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrl: './create-vendor.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class CreateVendorComponent {
  tabMenu = ['Other details']
  tab:string = 'other'
  createVendorForm:any;
  isSubmitted:boolean = false
  loading:boolean = false;
  pageLoading: boolean = false;
  branches:any;
  currencies:any;
  paymentTerms:any;
  vendors:any;
  vendoCategories:any;

  constructor(private fb:FormBuilder,
              private api:HttpServiceService,
              private messageService:MessageService,
              private router:Router) { }

  ngOnInit(){
    this.createVendorForm = this.fb.group({
      salutation: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company_name: ['', Validators.required],
      display_name: ['', Validators.required],
      email: ['', Validators.required],
      work_phone: ['', Validators.required],
      mobile: ['', Validators.required],
      payment_term_id: ['', Validators.required],
      currency_id: ['', Validators.required],
      category_id: ['', Validators.required],
      address: ['', Validators.required],
      website: [''],
      twitter: [''],
      facebook: [''],
      instagram: [''],
    })

    this.getBranches()
    this.getCurrencies()
    this.getPaymentTerms()
    this.getVendorCategory()
  }

  goBack(){
    window.history.back();
  }

  toggleTab(view:string){
    this.tab = view;
  }

  get f(){{return this.createVendorForm.controls}}


  getBranches(){
    this.pageLoading = true;
    this.api.get('branches').subscribe(
      res=>{
        this.branches = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
        this.showError('Failed to load sales data');
      }
    )
  }

  getCurrencies(){
    this.pageLoading = true;
    this.api.get('currencies').subscribe(
      res=>{
        this.currencies = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
        this.showError('Failed to load sales data');
      }
    )
  }

  getPaymentTerms(){
    this.pageLoading = true;
    this.api.get('payment_terms').subscribe(
      res=>{
        this.paymentTerms = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
        this.showError('Failed to load sales data');
      }
    )
  }

  getVendorCategory(){
    this.pageLoading = true;
    this.api.get('vendor_categories').subscribe(
      res=>{
        this.vendoCategories = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
        this.showError('Failed to load sales data');
      }
    )
  }


  saveVendor(){
    this.isSubmitted = true;
    this.loading = true;

    if(this.createVendorForm.invalid){
      this.loading = false;
      console.log(this.createVendorForm.value)
      console.log('form is invalid')
      this.loading = false;

      return;
    }
    this.api.post('vendors', this.createVendorForm.value).subscribe(
      res=>{
        console.log(res);
        this.createVendorForm.reset();
        this.showSuccess('Vendor added successfully')
        this.isSubmitted = false
        this.loading = false;
        this.goBack()
      }, err=>{
        console.log(err);
        this.showError('Failed to add vendor ')
        this.loading = false;
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
