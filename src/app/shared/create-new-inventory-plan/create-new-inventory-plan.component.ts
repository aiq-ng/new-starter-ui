import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-new-inventory-plan',
  templateUrl: './create-new-inventory-plan.component.html',
  styleUrl: './create-new-inventory-plan.component.scss'
})
export class CreateNewInventoryPlanComponent {
  @Input() wareHouses!: any;
  @Input() vendors!: any;
  @Input() units!: any;
  @Input() loading:boolean = false;
  @Output() togleModal = new EventEmitter<string>();
  @Output() saveProduct = new EventEmitter<string>();

  createPlanForm:any;
  isSubmitted: boolean = false;
  products:any;
  planProducts:any = []
  formGroup: any;


  constructor(private fb:FormBuilder,
              private api:HttpServiceService,
              private messageService: MessageService){}


  ngOnInit(){
    this.createPlanForm = this.fb.group({
      // Basic information
      name: ['', Validators.required],
      // Sales information
      plan_date: ['', [Validators.required]],

      // Inventory
      products: ['',]
    });

    this.getProducts()


  }



  addPlanProduct(){
    console.log(this.createPlanForm.get('products')?.value)
    this.planProducts.push({"id": Number(this.createPlanForm.get('products')?.value)})
    this.createPlanForm.patchValue({ products: ''})
    console.log(this.planProducts)
  }

  toggleCreatePlan(){
    this.togleModal.emit()
  }

  getProducts(){
    return this.api.get('products').subscribe(
      res =>{
        this.products = res
        this.products = this.products.data
      }
    )


  }


  get f() {
    return this.createPlanForm.controls;
  }



  save() {
    this.isSubmitted = true;

    console.log(this.createPlanForm.value);

    if (this.createPlanForm.invalid) {
      console.log("form invalid");
      return;
    }

    const planData = {
      "name": this.createPlanForm.get('name').value,
      "plan_date": this.createPlanForm.get('plan_date').value,
      "products": this.planProducts
    }

    this.api.post('inventory/plans', planData).subscribe(
      res => {
        console.log(res);
        this.showSuccess('Product created successfully');
        this.createPlanForm.reset();
        this.isSubmitted = false;

        this.planProducts.length = 0
      },
      err => {
        console.log(err);
        this.showError('Failed to create product, please try again');
      }
    );
  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
