import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-price-list',
  templateUrl: './edit-price-list.component.html',
  styleUrl: './edit-price-list.component.scss',
  providers: [MessageService]
})
export class EditPriceListComponent {
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
      item_id:any;
      itemsToAdd:any = []
      totalToPay:any;
      taxes:any;
      priceList:any;



      constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService:MessageService){}

      ngOnInit(): void {
        this.priceListForm = this.fb.group({
          item_category_id: ['', Validators.required],
          item_details: ['', [Validators.required]],
          unit_price: [ [Validators.required]],
          minimum_order: [''],
          unit_id: [] // FormArray for dynamic rows
        });

        this.getItemCategory()
        this.getUnits()
        this.getPriceList()
      }

      goBack(){
        window.history.back();
      }

      getParamsId(){
        const url = window.location.href;
        console.log('url', url);
        const segments = url.split('/');
        this.item_id = segments[segments.length - 1];

        return this.item_id;
      }

      getPriceList(){
        this.pageLoading = true;
        this.api.get('sales/price-list/' + this.getParamsId()).subscribe(
          res=>{
            this.priceList = res;
            this.pageLoading = false;

            this.priceListForm.patchValue({item_category_id: this.priceList.data.item_category_id})
            this.priceListForm.patchValue({item_details: this.priceList.data.item_details})
            this.priceListForm.patchValue({unit_price: this.priceList.data.unit_price})
            this.priceListForm.patchValue({minimum_order: this.priceList.data.minimum_order})
            this.priceListForm.patchValue({unit_id: this.priceList.data.unit_id})

          },
          err=>{
            console.log(err)
          }
        )
      }

      // Getter for items FormArray
      get list(){
        return this.priceListForm.get('list') as FormArray;
      }

      // Add new row


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
        this.api.update('sales/price-list/' + this.item_id, this.priceListForm.value).subscribe(
          res=>{
            console.log(res);
            this.priceListForm.reset();
            this.showSuccess('Price list updated successfully')
            this.getPriceList()
            this.isSubmitted = false
            this.loading = false;
          }, err=>{
            console.log(err);
            this.showError('Failed to update price list')
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
