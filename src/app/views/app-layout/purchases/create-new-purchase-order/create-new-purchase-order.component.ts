import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-new-purchase-order',
  templateUrl: './create-new-purchase-order.component.html',
  styleUrl: './create-new-purchase-order.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class CreateNewPurchaseOrderComponent {
  purchaseOrderForm:any;
  isSubmitted:boolean = false;
  loading:boolean = false;
  vendors:any;
  branches:any;
  paymentTerms:any;
  pageLoading:boolean = false;
  iventoryItems:any;
  // items:any;
  itemsToAdd:any = []
  totalToPay:any;
  taxes:any;




  constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService:MessageService){}

  ngOnInit(): void {
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
      total: [{ value: 0, disabled: true }], // Readonly total
      items: this.fb.array([]) // FormArray for dynamic rows
    });

    this.getVendors()
    this.getBranches()
    this.getItems()
    this.getTaxes()
    this.getPaymentTerms()
    this.addRow();
  }

  goBack(){
    window.history.back();
  }

  // Getter for items FormArray
  get items(): FormArray {
    return this.purchaseOrderForm.get('items') as FormArray;
  }

  // Add new row
  addRow(): void {
    this.items.push(this.fb.group({
      item_id: ['', Validators.required],
      quantity: [0, [Validators.required]],
      price: [0, [Validators.required]],
      tax_id: [''],
      amount: []
    }));
  }


  get f(){return this.purchaseOrderForm.controls}



  savePurchase(){
    this.isSubmitted = true;
    this.loading = true;
    console.log(this.purchaseOrderForm.value)
    if(this.purchaseOrderForm.invalid){
      console.log(this.purchaseOrderForm.value)
      console.log('invalid purchase order form')
      this.loading = false;
      return;
    }
    // save purchase order data
    let purchaseData = this.purchaseOrderForm.value
    purchaseData.total = this.totalToPay
    console.log(purchaseData)
    this.api.post('purchases/orders', this.purchaseOrderForm.value).subscribe(
      res=>{
        console.log(res);
        this.purchaseOrderForm.reset();
        this.showSuccess('purchase order added successfully')
        this.isSubmitted = false
        this.loading = false;
      }, err=>{
        console.log(err);
        this.showError('Failed to add purchase order')
        this.loading = false;
      }
    )
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
      }
    )
  }

  getBranches(){
    this.pageLoading = true;
    this.api.get('branches').subscribe(
      res=>{
        this.branches = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
      }
    )
  }

  getTaxes(){
    this.pageLoading = true;
    this.api.get('taxes').subscribe(
      res=>{
        this.taxes = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
      }
    )
  }


  getItems(){
    this.pageLoading = true;
    this.api.get('inventory').subscribe(
      res=>{
        this.iventoryItems = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
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
      }
    )
  }

  calculateRowAmount(index: number): void {
    const row = this.items.at(index);
    const quantity = row.get('quantity')?.value || 0;
    const price = row.get('price')?.value || 0;
    const amount = quantity * price;

    row.patchValue({ amount });
    this.calculateTotal();
  }

  // Calculate total amount for all items
  calculateTotal(): void {
    const total = this.items.controls.reduce((sum, row) => {
      return sum + (row.get('amount')?.value || 0);
    }, 0);

    this.purchaseOrderForm.patchValue({ total });
  }

  calculateTotalToPay(){
    this.totalToPay = this.purchaseOrderForm.get('total').value + Number(this.purchaseOrderForm.get('shipping_charge').value) - Number(this.purchaseOrderForm.get('discount').value)
  }

  // Remove row
  removeRow(index: number): void {
    this.items.removeAt(index);
    this.calculateTotal();
  }


  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
