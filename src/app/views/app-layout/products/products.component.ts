import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../services/product.service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService]
})
export class ProductsComponent {
  isWareHouse: boolean = false;
  isSubmitted: boolean = false;
  currentWareHouseId!: string;
  isCreateProduct: boolean = false;
  wareHouses:any = []
  pageLoading:boolean = false;

  products:any = [];

  constructor(private messageService: MessageService,
              private productService: ProductService,
              private api:HttpServiceService,
              private router:Router){}

  ngOnInit(){
    this.getProducts()
    this.getWarehouses()

  }

  toggleWareHouse(id:string){
    this.isWareHouse =!this.isWareHouse;
    this.currentWareHouseId = id
  }

  toggleCreateProduct(){
    this.isCreateProduct =!this.isCreateProduct;
  }

  getWarehouses(){
    this.pageLoading = true;
    this.api.get('warehouses').subscribe(
      res=>{
        this.wareHouses = res
        this.wareHouses = this.wareHouses.data
        this.pageLoading = false;
      },
      err=>{
        console.log('err')
      }
    )
  }

  getProducts(){
    return this.api.get('products?limit=10').subscribe(
      res =>{
        this.products = res
        this.products = this.products
        console.log('meta', res)
      }
    )


  }



  getWarehouseProducts(warehouseId:number){
    let products = this.products.data.filter((product:any)=>{return product.warehouse_id == warehouseId})
    return products
  }

  saveProduct(){
    this.isSubmitted = !this.isSubmitted;
    setTimeout(() => {
      this.showSuccess('product saved successfully!')
    })

  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  routeToDetail(id:any){
    this.router.navigateByUrl('/app/product/' + id)
  }

}
