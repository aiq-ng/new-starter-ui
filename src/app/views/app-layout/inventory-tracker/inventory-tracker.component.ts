import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-tracker',
  templateUrl: './inventory-tracker.component.html',
  styleUrl: './inventory-tracker.component.scss',
  providers: [MessageService]
})
export class InventoryTrackerComponent {
  isWareHouse: boolean = false;
  currentWareHouseId!: string;
  isCreatePlan: boolean = false;
  products:any = []
  wareHouses:any;
  item_id:any;
  pageLoading:any = false;
  inventoryData:any;
  filter:any = '';
  tabMenu = ['All','Low stock', 'In Stock', 'Out of Stock']


  tableHeader = ['Name', 'BuyingPrice', 'Quantity', 'Threshold Value', 'Expiry Date', 'SKU', 'Availability', 'Image',]


  constructor(private messageService: MessageService,
              private productService: ProductService,
              private api: HttpServiceService,
              private router: Router,
              ){}

  ngOnInit(){

    this.getInventoryPlan('')

  }


  filterInventory(value:any){
    console.log(value.toLowerCase())
    if(value=='All'){
      this.getInventoryPlan('')
    }else {
      this.getInventoryPlan(value.toLowerCase())
    }
  }

  getInventoryPlan(filterValue:string){
    this.pageLoading= true;
    return this.api.get(`inventory?page=1&page_size=5&availability=${filterValue}&sort=DESC`).subscribe(
      res =>{
        let response:any = res
        this.inventoryData = response.data
        console.log(this.inventoryData)
        this.pageLoading=false;
      }, err=>{
        console.log(err)
        this.pageLoading=false;
      }
    )

  }

  toggleWareHouse(id:string){
    this.isWareHouse =!this.isWareHouse;
    this.currentWareHouseId = id
  }

  toggleCreateProduct(){
    this.isCreatePlan =!this.isCreatePlan;
    // this.getInventoryPlan()
  }

  // toggleChooseWareHouse(){
  //   this.isChooseWareHouse =!this.isChooseWareHouse;
  // }

  route(page:string){
    this.router.navigateByUrl(page);
  }



}
