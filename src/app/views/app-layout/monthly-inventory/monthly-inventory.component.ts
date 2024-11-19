import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../services/http-service.service';

@Component({
  selector: 'app-monthly-inventory',
  templateUrl: './monthly-inventory.component.html',
  styleUrl: './monthly-inventory.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class MonthlyInventoryComponent {
  istoggleUpdateProduct:boolean = true;
  iscompleteInventry:boolean = false;
  isWareHouse:boolean = false;
  wareHousesId:any;
  warehouseInventory:any =[];
  completeInventoryData:any;
  loadingUpdatedQuantity:boolean = false;
  loadingWarehouse:boolean = false;
  loadingwarehouseInventory:boolean = false;
  isProductUpdated: boolean = false;
  currentMonthName: any;
  newCounted:any;


  updatedQuantityData:any = []


  tableHeader = ['No', 'Image', 'Product Name', 'On Hand', 'Counted', 'Difference']

  constructor(private router: Router, private api:HttpServiceService, private messageService: MessageService){}

  ngOnInit(){
    this.getWareHouseId();
    this.getWarehouseInventory();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.currentMonthName = monthNames[new Date().getMonth()];
    console.log("Current month:", this.currentMonthName);

  }

  route(){
    this.router.navigateByUrl('/app/product')
    console.log('router click')
  }

  getWareHouseId(){
    const url = window.location.href;
    const segments = url.split('/');
    this.wareHousesId = segments[segments.length - 1];
  }

  getWarehouseInventory(){
    this.loadingwarehouseInventory = true;
    this.api.get('warehouses/inventory/' + this.wareHousesId).subscribe(
      res=>{
        console.log(res);
        this.warehouseInventory = res;
        this.warehouseInventory = this.warehouseInventory.data

        console.log('warehouseInventory', this.warehouseInventory)

        this.updatedQuantityData.push(
          {
            "label": "Location",
            "value": this.warehouseInventory?.location
          },
          {
            "label": "Inventory Date",
            "value": "August 3, 2023"
          },
          {
            "label": "Duration of Inventory",
            "value": "10 days"
          },
          {
            "label": "Product",
            "value": this.warehouseInventory?.total_products
          },
          {
            "label": "Total Items Counted",
            "value": 200
          }
        )
        this.loadingwarehouseInventory = false;
        console.log(this.updatedQuantityData)
      },
      err=>{
        console.log(err);
      }
    )
  }

  completeInventory(){

    let completeInventory:any=[];
    for(let inventory of this.warehouseInventory.product_list){
      completeInventory.push({'id': inventory.no, 'counted': inventory.counted})
    }

    console.log(completeInventory)

    this.api.post('inventory/completed', {'products': completeInventory}).subscribe(
      res=>{
        console.log(res);
        this.completeInventoryData = res;
        this.completeInventoryData = this.completeInventoryData.data
        console.log('completeInventoryData', this.completeInventoryData)
        this.toggleCompleteInventry()
      },
      err=>{
        console.log(err);
      }
    )
  }

  toggleCompleteInventry(){
    this.iscompleteInventry =!this.iscompleteInventry;
  }

  updateDifference(product: any) {
    product.difference = product.counted - product.on_hand;
  }

  confirmUpdate(no: number) {
    const item = this.warehouseInventory?.product_list.find((product: any) => product.no === no);
    if (item) {
      console.log(`Confirmed update for product ${item.product_name}:`, item);
      this.showSuccess(`${item.product_name} updated successfully`)
    } else {
      console.log(`Product with no. ${no} not found.`);
      this.showError(`${item.product_name} uupdate failed try again.`)
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
