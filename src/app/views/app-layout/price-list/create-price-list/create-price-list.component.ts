import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-price-list',
  templateUrl: './create-price-list.component.html',
  styleUrl: './create-price-list.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class CreatePriceListComponent {
    priceListForm:any;
    isSubmitted:boolean = false;
    loading:boolean = false;
    vendors:any;
    branches:any;
    paymentTerms:any;
    pageLoading:boolean = false;
    iventoryItems:any;
    itemCategory:any;
    units:any
    // items:any;
    itemsToAdd:any = []
    totalToPay:any;
    taxes:any;




    constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService:MessageService){}

    ngOnInit(): void {
      this.priceListForm = this.fb.group({
        list: this.fb.array([]) // FormArray for dynamic rows
      });

      this.getItemCategory()
      this.getUnits()
      this.addRow();
    }

    goBack(){
      window.history.back();
    }

    // Getter for items FormArray
    get list(): FormArray {
      return this.priceListForm.get('list') as FormArray;
    }

    // Add new row
    addRow(): void {
      this.list.push(this.fb.group({
        item_category_id: ['', Validators.required],
        item_details: ['', [Validators.required]],
        unit_price: [ [Validators.required]],
        minimum_order: [''],
        unit_id: []
      }));
    }


    get f(){return this.priceListForm.controls}



    savePriceList(){
      this.isSubmitted = true;
      this.loading = true;
      console.log(this.priceListForm.value)
      if(this.priceListForm.invalid){
        console.log(this.priceListForm.value)
        console.log('invalid purchase order form')
        this.loading = false;
        return;
      }
      // save purchase order data
      let purchaseData = this.priceListForm.value
      purchaseData.total = this.totalToPay
      console.log(purchaseData)
      this.api.post('sales/price-list', this.priceListForm.value).subscribe(
        res=>{
          console.log(res);
          this.priceListForm.reset();
          this.showSuccess('purchase order added successfully')
          this.list.clear();
          this.isSubmitted = false
          this.loading = false;
        }, err=>{
          console.log(err);
          this.showError('Failed to add purchase order')
          this.loading = false;
        }
      )
    }


    getItemCategory(){
      this.pageLoading = true;
      this.api.get('item_categories').subscribe(
        res=>{
          this.itemCategory = res;
          this.pageLoading = false;
        },
        err=>{
          console.log(err)
        }
      )
    }

    getUnits(){
      this.pageLoading = true;
      this.api.get('units').subscribe(
        res=>{
          this.units = res;
          this.pageLoading = false;
        },
        err=>{
          console.log(err)
        }
      )
    }


    // Calculate total amount for all items


    // Remove row
    removeRow(index: number): void {
      this.list.removeAt(index);
    }


    showSuccess(message: string) {
      console.log('showSuccess')
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }

}
