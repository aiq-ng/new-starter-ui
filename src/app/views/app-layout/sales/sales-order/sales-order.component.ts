import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.scss',
  providers: [MessageService]
})
export class SalesOrderComponent {
    isWareHouse: boolean = false;
    currentWareHouseId!: string;
    isCreatePlan: boolean = false;
    products:any = []
    wareHouses:any;
    item_id:any;
    pageLoading:any = false;
    saleInvoice:any;
    inventoryData:any;
    filter:any = '';
    tabMenu = ['All','Sent', 'Completed', 'Services', 'Upcoming', 'Cancel']


    tableHeader = [
      "Order Id",
      "Order",
      "Quantity",
      "Customer Name",
      "Date",
      "Order Type",
      "Amount",
      "Status"

    ]

    constructor(private messageService: MessageService,
                private api: HttpServiceService,
                private router: Router,
                ){}

    ngOnInit(){

      this.getSales('', '', 1)

    }


    paginate(page:any){
      console.log('page', page)
      this.getSales('', '', page);
    }

    filterInventory(value:any){
      console.log(value.toLowerCase())
      if(value=='All'){
        this.getSales('', '', 1)
      }else if(value=='Services'){
        this.getSales('', value.toLowerCase(), 1)
      }else {
        this.getSales(value.toLowerCase(), '', 1)
      }
    }

    getSales(status:string, order_type:string, page:any){
      this.pageLoading= true;
      return this.api.get(`sales/orders?page=${page}&page_size=10&status=${status}&order_type=${order_type}&start_date=&end_date`).subscribe(
        res =>{
          let response:any = res
          this.inventoryData = response
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
