import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-sale-order',
  templateUrl: './create-sale-order.component.html',
  styleUrl: './create-sale-order.component.scss',
  providers: [MessageService]
})
export class CreateSaleOrderComponent {

  purchaseOrderForm:any;
    isSubmitted:boolean = false;
    loading:boolean = false;
    vendors:any;
    branches:any;
    paymentTerms:any;
    paymentMethod:any;
    customers:any;
    drivers:any;
    pageLoading:boolean = false;
    iventoryItems:any;
    // items:any;
    itemsToAdd:any = []
    total:any;
    totalToPay:any;
    taxes:any;




    constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService:MessageService){}

    ngOnInit(): void {
      this.purchaseOrderForm = this.fb.group({
        order_type: ['', Validators.required],
        order_title: ['', Validators.required],
        customer_id: ['', Validators.required],
        payment_method_id: ['', Validators.required],
        payment_term_id: ['', Validators.required],
        delivery_option: ['', Validators.required],
        assigned_driver_id: ['', Validators.required],
        delivery_date: ['', Validators.required],
        additional_note: ['', Validators.required],
        customer_note: ['', Validators.required],
        discount: ['', Validators.required],
        delivery_charge: ['', Validators.required],
        total: [], // Readonly total
        items: this.fb.array([]) // FormArray for dynamic rows
      });

      this.getPaymentMethod()
      this.getCustomers()
      this.getTaxes()
      this.getPaymentTerms()
      this.getItems()
      this.getDrivers()
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



    saveOrder(){
      this.isSubmitted = true;
      this.loading = true;
      console.log(this.purchaseOrderForm.value)
      if(this.purchaseOrderForm.invalid){
        console.log(this.purchaseOrderForm.value)
        console.log('invalid order form')

        return;
      }
      // save purchase order data
      let purchaseData = this.purchaseOrderForm.value
      purchaseData.total = this.totalToPay
      console.log(purchaseData)
      this.api.post('sales/orders', this.purchaseOrderForm.value).subscribe(
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

    getDrivers(){
      this.pageLoading = true;
      this.api.get('human-resources/employees?departments=riders').subscribe(
        res=>{
          this.drivers = res;
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

    getCustomers(){
      this.pageLoading = true;
      this.api.get('customers').subscribe(
        res=>{
          this.customers = res;
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
      console.log('calculating')
      const total = this.items.controls.reduce((sum, row) => {
        return sum + (row.get('amount')?.value || 0);
      }, 0);
      this.purchaseOrderForm.patchValue({ total:total });

      console.log('value from form', this.purchaseOrderForm.get('total').value);


    }

    calculateTotalToPay(){
      console.log('calculateTotalToPay', this.purchaseOrderForm.get('total').value)
      this.totalToPay = this.purchaseOrderForm.get('total').value + Number(this.purchaseOrderForm.get('delivery_charge').value) - Number(this.purchaseOrderForm.get('discount').value)
      console.log(this.totalToPay)
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
