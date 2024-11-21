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
  pageLoading:any = false;


  tableHeader = ['Name', 'BuyingPrice', 'Quantity', 'Threshold Value', 'Expiry Date', 'SKU', 'Availability']


  constructor(private messageService: MessageService,
              private productService: ProductService,
              private api: HttpServiceService,
              private router: Router,
              ){}

  ngOnInit(){
    this.getInventoryPlan()
    this.getWarehouses()

  }

  getInventoryPlan(){
    this.pageLoading= true;
    return this.api.get('inventory/plans').subscribe(
      res =>{



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

  toggleWareHouse(id:string){
    this.isWareHouse =!this.isWareHouse;
    this.currentWareHouseId = id
  }

  toggleCreateProduct(){
    this.isCreatePlan =!this.isCreatePlan;
    this.getInventoryPlan()
  }

  // toggleChooseWareHouse(){
  //   this.isChooseWareHouse =!this.isChooseWareHouse;
  // }

  route(page:string){
    this.router.navigateByUrl(page);
  }



}
