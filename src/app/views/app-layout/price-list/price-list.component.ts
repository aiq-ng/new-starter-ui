import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.scss',
  providers: [MessageService]
})
export class PriceListComponent {

      isWareHouse: boolean = false;
      currentWareHouseId!: string;
      isCreatePlan: boolean = false;
      products:any = []
      wareHouses:any;
      item_id:any;
      pageLoading:any = false;
      priceList:any;
      filter:any = '';
      tabMenu = ['Pastry & more', 'Chiken', 'Seafood', 'Beef', 'Grils']


      tableHeader = [
        "S/N",
        "Item",
        "Unit Price",
        "Minimum Order Quantity",
        "Action"
      ]

      constructor(private messageService: MessageService,
                  private api: HttpServiceService,
                  private router: Router,
                  ){}

      ngOnInit(){

        this.getPriceList(1)

      }

      paginate(page:any){
        console.log('page', page)
        this.getPriceList(page);
      }


      // filterInventory(value:any){
      //   console.log(value.toLowerCase())
      //   if(value=='All'){
      //     this.getPriceList(1)
      //   }else if(value=='Services'){
      //     this.getPriceList('', value.toLowerCase())
      //   }else {
      //     this.getPriceList(value.toLowerCase(), '')
      //   }
      // }

      getPriceList(page:any){
        this.pageLoading= true;
        return this.api.get(`sales/price-list?page=${page}&page_size=10`).subscribe(
          res =>{
            let response:any = res
            this.priceList = response
            console.log(this.priceList)
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
