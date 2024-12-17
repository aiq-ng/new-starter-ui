import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-purchase-order',
  templateUrl: './create-new-purchase-order.component.html',
  styleUrl: './create-new-purchase-order.component.scss'
})
export class CreateNewPurchaseOrderComponent {
  purchaseOrderForm:any;
  isSubmitted:boolean = false;
  loading:boolean = false;
  vendors:any;
  branches:any;
  paymentTerms:any;




  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.purchaseOrderForm = this.fb.group({
      vendor_id: ['', Validators.required],
      branch_id: ['', Validators.required],
      delivery_date: ['', Validators.required],
      payment_term_id: ['', Validators.required],
      subject: ['', Validators.required],
      notes: ['', Validators.required],
      terms_and_conditions: ['', Validators.required],
      discount: ['', Validators.required],
      shipping_charge: ['', Validators.required],
      total: ['', Validators.required]
    });
  }

  get f(){return this.purchaseOrderForm.controls}

  savePurchase(){}

}
