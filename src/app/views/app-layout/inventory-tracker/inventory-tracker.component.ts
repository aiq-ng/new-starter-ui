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
  tabMenu = ['All','Low stock', 'In-Stock', 'Out of Stock']


  tableHeader = ['Name', 'BuyingPrice', 'Quantity', 'Threshold Value', 'Expiry Date', 'SKU', 'Availability', 'Image',]


  constructor(private messageService: MessageService,
              private productService: ProductService,
              private api: HttpServiceService,
              private router: Router,
              ){}

  ngOnInit(){
    // this.inventoryData = [
    //   {
    //     Name: "Apple",
    //     BuyingPrice: 1.2,
    //     Quantity: 50,
    //     ThresholdValue: 10,
    //     ExpiryDate: "2024-12-10",
    //     SKU: "FRU-APL-001",
    //     Availability: "Available"
    //   },
    //   {
    //     Name: "Milk",
    //     BuyingPrice: 0.8,
    //     Quantity: 30,
    //     ThresholdValue: 5,
    //     ExpiryDate: "2024-11-25",
    //     SKU: "DAI-MLK-002",
    //     Availability: "Available"
    //   },
    //   {
    //     Name: "Bread",
    //     BuyingPrice: 1.0,
    //     Quantity: 20,
    //     ThresholdValue: 8,
    //     ExpiryDate: "2024-11-22",
    //     SKU: "BKE-BRD-003",
    //     Availability: "Available"
    //   },
    //   {
    //     Name: "Butter",
    //     BuyingPrice: 2.5,
    //     Quantity: 15,
    //     ThresholdValue: 4,
    //     ExpiryDate: "2024-12-05",
    //     SKU: "DAI-BTR-004",
    //     Availability: "Low Stock"
    //   },
    //   {
    //     Name: "Carrot",
    //     BuyingPrice: 0.5,
    //     Quantity: 100,
    //     ThresholdValue: 20,
    //     ExpiryDate: "2024-12-15",
    //     SKU: "VEG-CAR-005",
    //     Availability: "Available"
    //   }
    // ];

    this.getInventoryPlan()

  }




  getInventoryPlan(){
    this.pageLoading= true;
    return this.api.get('inventory?page=1&page_size=5&availability=in stock&sort=DESC').subscribe(
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
    this.getInventoryPlan()
  }

  // toggleChooseWareHouse(){
  //   this.isChooseWareHouse =!this.isChooseWareHouse;
  // }

  route(page:string){
    this.router.navigateByUrl(page);
  }



}
