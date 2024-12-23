import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class EditItemComponent {
  @Input() departments!: any;
  @Input() categories!: any;
  @Input() manufacturers!: any;
  @Input() units!: any;
  @Input() loading:boolean = false;
  @Output() togleModal = new EventEmitter<string>();
  @Output() saveProduct = new EventEmitter<string>();

  productDetailForm:any;
  isSubmitted: boolean = false;
  files:any;
  imageSrc:any;
  accommodationImageSrc:any;
  viewImages:boolean=false;
  item_id:any;
  pageLoading:boolean = false;
  itemDetail:any;



  constructor(private fb:FormBuilder,
              private api:HttpServiceService,
              private messageService: MessageService){}


  ngOnInit(){
    this.productDetailForm = this.fb.group({
      // Basic information
      name: ['', Validators.required],
      department_id: ['', Validators.required],
      category_id: ['', Validators.required],
      manufacturer_id: ['', Validators.required],
      date_recieved: ['', Validators.required],
      image: [''],
      expiry_date: ['', Validators.required],

      // Sales information
      description: ['', [Validators.required, Validators.min(0)]],

      // Inventory
      quantity: ['', [Validators.required, Validators.min(1)]],
      unit_id: ['', Validators.required],
      price: ['', Validators.required],
      threshold_value: ['', Validators.required],
    });

    this.getParamsId()
    this.getUnits()
    this.getItemDetail()
    this.getDepartments()
    this.getManufacturers();
    this.getCategories();
    }

  toggleCreateProduct(){
    this.togleModal.emit()
  }


  get f() {
    return this.productDetailForm.controls;
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
    console.log(this.pageLoading)
    return this.api.get('inventory/items/' + this.getParamsId()).subscribe(
      res =>{
        let response:any = res
        this.itemDetail = response.data
        console.log(this.itemDetail)
        this.pageLoading=false;

        this.patchItemDetail(this.itemDetail)

      }, err=>{
        console.log(err)
        this.pageLoading=false;
    console.log(this.pageLoading)

      }
    )

  }

  patchItemDetail(data:any){
    this.productDetailForm.patchValue({'name': data.name})
    this.productDetailForm.patchValue({'department_id': data.department_id})
    this.productDetailForm.patchValue({'category_id': data.category_id})
    this.productDetailForm.patchValue({'manufacturer_id': data.manufacturer_id})
    this.productDetailForm.patchValue({'description': data.description})
    this.productDetailForm.patchValue({'date_recieved': data.date_recieved})
    this.productDetailForm.patchValue({'image': data.image})
    this.productDetailForm.patchValue({'expiry_date': data.expiry_date})
    this.productDetailForm.patchValue({'quantity': data.remaining_stock})
    this.productDetailForm.patchValue({'unit_id': data.unit_id})
    this.productDetailForm.patchValue({'price': data.price})
    this.productDetailForm.patchValue({'threshold_value': data.threshold_value})

    console.log(this.productDetailForm.value)
  }

  getUnits(){
    this.api.get('units').subscribe(
      res=>{
        this.units = res
      }
    )
  }

  goBack(){
    window.history.back()
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

  update() {
    this.loading = true;
    this.isSubmitted = true;

    console.log(this.productDetailForm.value);

    if (this.productDetailForm.invalid) {
      console.log("form invalid");
      this.loading = false;
      return;
    }

    let formData:any = new FormData();

    // Append each file in the files array to FormData
    if(this.files){
      this.files.forEach((file: any) => {
        formData.append(`media[]`, file, file.name);  // Append each file with the key media[]
      });
    }

    // Append other form data
    formData.append('name', this.productDetailForm.get('name')?.value);
    formData.append('department_id', this.productDetailForm.get('department')?.value);
    formData.append('category_id', this.productDetailForm.get('category_id')?.value);
    formData.append('manufacturer_id', this.productDetailForm.get('manufacturer_id')?.value);
    formData.append('date_recieved', this.productDetailForm.get('created_at')?.value);
    formData.append('expiry_date', this.productDetailForm.get('expiry_date')?.value);
    formData.append('description', this.productDetailForm.get('description')?.value);
    formData.append('unit_id', this.productDetailForm.get('unit_id')?.value);
    formData.append('quantity', this.productDetailForm.get('quantity')?.value);
    formData.append('threshold_value', this.productDetailForm.get('threshold_value')?.value);
    formData.append('price', this.productDetailForm.get('price')?.value);



    this.api.post('inventory/items/' + this.item_id, formData).subscribe(
      res => {
        console.log(res);
        this.showSuccess('Product created successfully');
        this.isSubmitted = false;
        this.loading = false;

      },
      err => {
        console.log(err);
        this.showError('Failed to create product, please try again');
        this.loading = false;
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
