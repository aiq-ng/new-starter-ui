import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from './../../../../shared/shared.module';
import { HttpServiceService } from '../../../../services/http-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})

// imports: [
//   SharedModule  // <-- import it here
// ]
export class ItemDetailComponent {
  tabMenu = ['All','Low stock', 'In-Stock', 'Out of Stock']
  adjustStock:boolean = false;
  adjustmentType:string = 'minus';
  editStock:boolean = false;
  itemDetail:any;
  item_id:any;
  pageLoading:boolean = false;
  adjustmentForm:any;
  isSubmitted:boolean = false;
  vendors:any=[];
  departments:any=[];
  employees:any=[];
  users:any=[];

  constructor(
              private router: Router,
              private api:HttpServiceService,
              private fb:FormBuilder,
              private messageService:MessageService){}

  ngOnInit(){
    this.adjustmentForm = this.fb.group({
      adjustment_type: ['', Validators.required],
      quantity: ['', Validators.required],
      collector_id: ['', Validators.required],
      receiving_department_id: ['', Validators.required],
      vendor_id: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.getItemDetail();
    this.getVendors();
    this.getDepartments();
    this.getUsers();
  }


  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.item_id = segments[segments.length - 1];

    return this.item_id;
  }

  getItemDetail(){
    this.pageLoading= true;
    return this.api.get('inventory/items/' + this.getParamsId()).subscribe(
      res =>{
        let response:any = res
        this.itemDetail = response.data
        console.log(this.itemDetail)
        this.pageLoading=false;
      }, err=>{
        console.log(err)
        this.pageLoading=false;
      }
    )

  }

  adjustStockToggle(){
    this.adjustStock =!this.adjustStock;
  }
  route(page:string){
    this.router.navigateByUrl(page);
  }

  selectAdjustmentType(adjustmentType:string){
    this.adjustmentType = adjustmentType;
    this.adjustmentForm.patchValue({adjustment_type: adjustmentType})
    if(adjustmentType=='addition'){
      this.adjustmentForm.patchValue({collector_id: 0})
      console.log(this.adjustmentForm.get('adjustment_type').value);

    }else if(adjustmentType=='subtraction'){
      this.adjustmentForm.patchValue({vendor_id: 0})
      console.log(this.adjustmentForm.get('adjustment_type').value);
    }

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
        this.showError('Failed to load sales data');
      }
    )
  }

  getDepartments(){
    this.api.get('departments').subscribe(
      res=>{
        this.departments = res
      }, err=>{
        console.log(err);
      }
    )
  }

  getUsers(){
    this.api.get('users').subscribe(
      res=>{
        this.users = res
      }, err=>{
        console.log(err);
      }
    )
  }

  get f(){return this.adjustmentForm.controls};

  saveAdjustment(){
    if(this.adjustmentForm.invalid){
      console.log(this.adjustmentForm.value)
      this.showError('One or more fields are required')
      return;
    }

    this.api.post('inventory/items/stocks/' + this.item_id, this.adjustmentForm.value).subscribe(
      res => {
        console.log(res);
        this.showSuccess('Quantity adjusted successfully');
        this.adjustmentForm.reset();
        this.getItemDetail()
        this.isSubmitted = false;
      },
      err => {
        console.log(err);
        this.showError('Failed to adjut quantity, please try again');
      }
    );

  }

  editItemToggle(){
    this.route('/app/prochurement/edit-item/1');
  }


  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
