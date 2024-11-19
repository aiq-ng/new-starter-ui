import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  providers: [MessageService]
})
export class ProductDetailComponent {
  istoggleUpdateProduct:boolean = true;
  isSubmitted:boolean = false;
  isUpdateProduct:boolean = false;
  loading:boolean = false;
  isWareHouse:boolean = false;
  isProductUpdated: boolean = false;
  updateQuantityForm!:any;
  productId:any;
  productDetail:any =null;
  reasons:any;
  images:any = [];
  wareHouses:any;



updatedQuantityData:any = []

  cards = [{"title": "On hand", "figure": 234}, {"title": "To be Delivered", "figure": 64}, {"title": "To be ordered", "figure": 50}]
  responsiveOptions: any[] | undefined;

  constructor(private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService,
              private api:HttpServiceService){}

              currentIndex = 0; // Tracks the current slide index

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  jumpTo(index: number) {
    this.currentIndex = index;
  }



    ngOnInit() {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];

        this.updateQuantityForm = this.fb.group({
          // Form fields here
          new_quantity: ['', Validators.required],
          reason: ['', [Validators.required]],
          note: [''],
          // ... other fields
        });


        this.getProduct(this.getProductId())
        this.getUpdateReason()
    }

  route(){
    this.router.navigateByUrl('/app/product')
    console.log('router click')
  }

  populateUpdatedQuantityData() {
      this.updatedQuantityData = [
        {
          label: "Current quantity",
          value: this.productDetail.data?.quantity || 0 // Handle missing quantity
        },
        {
          label: "New quantity",
          value: this.updateQuantityForm.get('new_quantity').value
        },
        {
          label: "Discrepancies",
          value: (this.productDetail.data?.quantity || 0) - this.updateQuantityForm.get('new_quantity').value || 0
        },
        {
          label: "Reason for update",
          value: this.updateQuantityForm.get('reason').value
        },
        {
          label: "Notes",
          value: ""
        }
      ];

      this.toggleUpdatedProduct()

      console.log('suppose to toggel updated product')
}

  getProductId(){
    const url = window.location.href;
    const segments = url.split('/');
    this.productId = segments[segments.length - 1];
  }

  getUpdateReason(){
    return this.api.get('reasons').subscribe(
      res =>{
        this.reasons = res
        this.reasons = this.reasons.data
      }
    )
  }

  getProduct(id:any){
    this.api.get('products/' + this.productId).subscribe(
      res=>{
        console.log(res);
        this.productDetail = res;
        // this.images = this.productDetail.data.media
        this.images = this.productDetail.data.media
        console.log('images', this.images);
      },
      err=>{
        console.log(err);
      }
    )
  }

  getWarehouses(){
    this.api.get('warehouses').subscribe(
      res=>{
        this.wareHouses = res
        this.wareHouses = this.wareHouses.data
      }
    )
  }

  // addImages(images:any){
  //   for(let image of images){
  //     this.images.push({
  //       itemImageSrc: image,
  //       thumbnailImageSrc: image,
  //       alt: 'Description for Image'+ this.images.length,
  //       title: 'Title'+ this.images.length
  //     })
  //   }
  // }


  toggleUpdatedProduct(){
    this.isProductUpdated =!this.isProductUpdated;
    this.isUpdateProduct =!this.isUpdateProduct;

    console.log('is updated product', this.isProductUpdated)
  }

  closeExistingModal(){
    this.isProductUpdated = false;
    this.isUpdateProduct = false;
  }

  toggleUpdateProduct(){
    this.isUpdateProduct =!this.isUpdateProduct;
  }

  get f(){
    return this.updateQuantityForm.controls;
  }

  updateQuantity(){
    this.isSubmitted=!this.isSubmitted;
    this.loading = true;

    if(this.updateQuantityForm.invalid){
      console.log('form invalid');
      this.loading = false;
      return;
    }

    this.api.update('products/quantity/' + this.productId, this.updateQuantityForm.value).subscribe(
      res=>{
        console.log(res);
        this.loading = false;
        this.isSubmitted = false;
        this.showSuccess('Quantity updated successfully')
        this.populateUpdatedQuantityData()
      },
      err=>{
        console.log(err);
        this.loading = false;
        this.showError('Failed to update quantity')
      }
    )

  }



  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
