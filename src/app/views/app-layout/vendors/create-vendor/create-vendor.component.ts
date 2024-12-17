import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrl: './create-vendor.component.scss'
})
export class CreateVendorComponent {
  tabMenu = ['Other details','Address']
  tab:string = 'other'
  createVendorForm:any;
  isSubmitted:boolean = false
  loading:boolean = false;

  constructor(private fb:FormBuilder) { }

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
      website: ['', Validators.required],
      twitter: [''],
      facebook: [''],
      instagram: [''],
    })
  }

  toggleTab(view:string){
    this.tab = view;
  }

  get f(){{return this.createVendorForm.controls}}

  saveVendor(){
    this.isSubmitted = true;
    this.loading = true;

    if(this.createVendorForm.invalid){
      this.loading = false;
      console.log(this.createVendorForm.value)
      console.log('form is invalid')
      return;
    }
    // save vendor data to server
    //...
  }

}
