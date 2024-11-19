import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PurchaseService } from '../../../services/purchase.service';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss',
  providers: [MessageService]  // Add MessageService to your component providers
})
export class PurchasesComponent {
  isAddSale: boolean = false;
  isCreatePurchase:boolean = false
  isSubmitted:boolean = false;
  formIsValid:boolean = false;
  loading:boolean = false;
  pageLoading:boolean = false;
  totalPrice: number = 0;
  invalidFields!: string[];
  purchases:any = []
  products:any = [];
  units:any;
  purchaseForm:any = {
    "date": "",
    "supplier": "",
  };

  expandedPurchases: Set<number> = new Set();

  purchaseItems: any[] = [
    { product: '', quantity: null, pricePerUnit: null }
  ];

  suppliers:any;

  constructor(private fb:FormBuilder,
              private messageService: MessageService,
              private purchaseService: PurchaseService,
              private api:HttpServiceService){}

  ngOnInit(){
    console.log('purchaseService')
    this.getPurchases()
    this.getSuppliers()
    this.getProducts()
  }

  toggleCreatePurchase() {
    this.isCreatePurchase = !this.isCreatePurchase;
  }

  getProducts(){
    this.api.get('products').subscribe(
      res =>{
        this.products = res
        this.products = this.products.data
      }
    )
  }
  getPurchases(){
    this.pageLoading=true;
    this.api.get('purchases?page&page_size=10').subscribe(
      res=>{
        this.purchases = res;
        this.purchases = this.purchases;
        this.pageLoading=false;
      }
    )
  }

  addItem() {
    this.purchaseItems.push({ product: '', quantity: null, price_per_unit: null });
  }


  calculateTotalCost(): number {
    return this.purchaseItems.reduce((total, item) => {
      return total + (item.quantity * item.price_per_unit || 0);
    }, 0);
  }

  tableHeader = [
    "purchaseDate",
    "supplier",
    "items",
    "totalCost",
    ""
  ]

  getTotalPrice(items: any[]): number {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  toggleExpand(index: number) {
    if (this.expandedPurchases.has(index)) {
      this.expandedPurchases.delete(index);
    } else {
      this.expandedPurchases.add(index);
    }
  }

  get f(){
    return this.purchaseForm.controls;
  }

  validateForm(){

    if(this.purchaseForm.purchaseData == '' || this.purchaseForm.supplier == ''){
      this.loading = false;
      return;
    }

    if(this.purchaseItems.length > 0){
      this.formIsValid = true;
      console.log('form is valid')
    }else {
      this.formIsValid = false;
      console.log('form is invalid')
      this.loading = false;
      return;
    }
  }

  savePurchase() {
    this.isSubmitted = true;
    this.loading = true;
    this.validateForm()
    const purchaseData = {
      date: this.purchaseForm.date, // get this from the input
      supplier: this.purchaseForm.supplier, // get this from the input
      items: this.purchaseItems,
      total_cost: this.calculateTotalCost()
    };

    this.api.post('purchases', purchaseData).subscribe(
      res=>{
        console.log(res);
        this.loading = false;
        this.resetForm()
        this.getPurchases();
        this.showSuccess('purchase added successfully!')
      },
      err=>{
        console.log(err)
        this.showError('Failed to add purchase, try again')
        this.loading = false;
      }
    )
  }

  getUnits(){
    this.api.get('units').subscribe(
      res=>{
        this.units = res;      }
    )
  }

  getSuppliers(){
    this.api.get('suppliers').subscribe(
      res=>{
        this.suppliers = res;
      },
      err=>{
        console.log(err)
      }
    )
  }

  toggleAddPurchase(){
    this.isCreatePurchase = !this.isCreatePurchase
  }

  resetForm(){
    this.isSubmitted = false;
    this.purchaseForm.date='', // get this from the input
    this.purchaseForm.supplier='', // get this from the input
    this.purchaseItems= [
      { product: '', quantity: null, pricePerUnit: null }
    ];

  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
