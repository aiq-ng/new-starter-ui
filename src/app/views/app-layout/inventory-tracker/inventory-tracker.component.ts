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
  isChooseWareHouse:boolean = false;
  pageLoading:any = false;

  inventoryPlans:any =[];
  available:any;
  unavailable:any;
  KIV:any;

  itemType:any;
  tableHeader = ['Name', 'Location', 'Inventory date', 'status', 'progress bar']


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
        this.inventoryPlans=res
        this.inventoryPlans = this.inventoryPlans.data

        console.log('inventoryPlans', this.inventoryPlans)

        this.available = this.inventoryPlans?.filter((item:any) => item.status === "available");
        this.unavailable = this.inventoryPlans?.filter((item:any) => item.status === "unavailable");
        this.KIV = this.inventoryPlans?.filter((item:any) => item.status === "kiv");

        console.log("Available:", this.available);
        console.log("Unavailable:", this.unavailable);
        console.log("KIV:", this.KIV);
        this.pageLoading=false;

        this.itemType =[
          {
            "id": "1",
            "name": "Unavailable Items",
            "product": this.unavailable,
          },

          {
            "id": "2",
            "name": "Deleteing Items",
            "product": [],
          },

          {
            "id": "3",
            "name": "Available Items",
            "product": this.available,
          },
          {
            "id": "4",
            "name": "KIV",
            "product": this.KIV,
          }
        ]
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

  toggleChooseWareHouse(){
    this.isChooseWareHouse =!this.isChooseWareHouse;
  }

  route(page:string){
    this.router.navigateByUrl(page);
  }



}
