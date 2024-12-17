import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';
import { MessageService } from 'primeng/api';


interface Warehouse {
  id: string;
  name: string;
  address: string;
  productCount: string;
  itemCount: string;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  providers: [MessageService]  // for PrimeNG messages
})
export class CreateProductComponent {
  @Input() departments!: any;
  @Input() categories!: any;
  @Input() manufacturers!: any;
  @Input() units!: any;
  @Input() loading:boolean = false;
  @Output() togleModal = new EventEmitter<string>();
  @Output() saveProduct = new EventEmitter<string>();

  createProductForm:any;
  isSubmitted: boolean = false;
  files:any;
  imageSrc:any;
  accommodationImageSrc:any;
  viewImages:boolean=false;



  constructor(private fb:FormBuilder,
              private api:HttpServiceService,
              private messageService: MessageService){}


  ngOnInit(){
    this.createProductForm = this.fb.group({
      // Basic information
      name: ['', Validators.required],
      department_id: ['', Validators.required],
      category_id: ['', Validators.required],
      manufacturer_id: ['', Validators.required],
      date_recieved: ['', Validators.required],
      image: ['', Validators.required],
      expiry_date: ['', Validators.required],

      // Sales information
      description: ['', [Validators.required, Validators.min(0)]],

      // Inventory
      quantity: ['', [Validators.required, Validators.min(1)]],
      unit_id: ['', Validators.required],
      price: ['', Validators.required],
      threshold_value: ['', Validators.required],
    });

    this.getUnits()
    this.getDepartments()
    this.getCategories();
    this.getManufacturers();

  }

  toggleCreateProduct(){
    this.togleModal.emit()
  }


  get f() {
    return this.createProductForm.controls;
  }





  getUnits(){
    this.api.get('units').subscribe(
      res=>{
        this.units = res
      }, err=>{
        console.log(err);
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


  getManufacturers(){
    this.api.get('item_manufacturers').subscribe(
      res=>{
        this.manufacturers = res
      }, err=>{
        console.log(err);
      }
    )
  }


  getCategories(){
    this.api.get('item_categories').subscribe(
      res=>{
        this.categories = res
      }, err=>{
        console.log(err);
      }
    )
  }

  save() {
    this.isSubmitted = true;

    console.log(this.createProductForm.value);

    let formData:any = new FormData();

    // Append each file in the files array to FormData
    this.files.forEach((file: any) => {
      formData.append(`media[]`, file, file.name);  // Append each file with the key media[]
    });

    // Append other form data
    formData.append('name', this.createProductForm.get('name')?.value);
    formData.append('department_id', this.createProductForm.get('department_id')?.value);
    formData.append('category_id', this.createProductForm.get('category_id')?.value);
    formData.append('manufacturer_id', this.createProductForm.get('manufacturer_id')?.value);
    formData.append('date_recieved', this.createProductForm.get('date_recieved')?.value);
    formData.append('expiry_date', this.createProductForm.get('expiry_date')?.value);
    formData.append('description', this.createProductForm.get('description')?.value);
    formData.append('unit_id', this.createProductForm.get('unit_id')?.value);
    formData.append('quantity', this.createProductForm.get('quantity')?.value);
    formData.append('threshold_value', this.createProductForm.get('threshold_value')?.value);
    formData.append('price', this.createProductForm.get('price')?.value);

    if (this.createProductForm.invalid) {
      console.log("form invalid");
      return;
    }

    this.api.post('inventory/items', formData).subscribe(
      res => {
        console.log(res);
        this.showSuccess('Product created successfully');
        this.createProductForm.reset();
        this.isSubmitted = false;
      },
      err => {
        console.log(err);
        this.showError('Failed to create product, please try again');
      }
    );
  }


  onFileSelected(event: any): void {
    console.log('selection function hit');

    // Store all selected files
    this.files = Array.from(event.target.files);  // Converts FileList to an array of files

    console.log(this.files);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
