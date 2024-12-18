import { Component } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-prochurement-overview',
  templateUrl: './prochurement-overview.component.html',
  styleUrl: './prochurement-overview.component.scss'
})
export class ProchurementOverviewComponent {
  calender:any;
  vendors:any =[];
  lowQuantityStock:any=[];
  mostPurchased:any = [];
  laoding:boolean = false;
  purchaseLoading:boolean = false;
  vendorLoading:boolean = false;
  lowStockLoading:boolean = false;

  overallInventory:any;
  tableHeader = [
    "Name",
    "Category",
    "Email",
    "Work Phone",
    "Address",
    "Transaction",
    "Status"

  ]

  constructor(private api: HttpServiceService, private location: Location, private router:Router) { };

  ngOnInit(){

    this.getLowQuantityStock()
    this.getMostPurchasedProduct()
    this.getTopVendors()
    this.getOverallInventory()
  }

  route(page:string){
    this.router.navigate([page]);
  }

  goBack(): void {
    this.location.back();
  }

  getTopVendors(){
    this.vendorLoading = true;
    this.api.get('vendors?page=1&page_size=5&sort_by=total_transaction&sort_order=desc&status=').subscribe(
      res=>{
        this.vendors = res;
        console.log(this.lowQuantityStock)
        // this.chartData = [this.lowQuantityStock?.data.cold_room, this.warehouseDetail?.data.kitchen]
        this.vendorLoading = false;
      },
      err=>{
        console.log('low quality error', err);
      }
    )

  }

  getMostPurchasedProduct(){
    this.purchaseLoading = true;
      this.api.get('dashboard/products/mostpurchased?page=1&page_size=5&month=12').subscribe(
        res=>{
          this.mostPurchased = res;
          console.log('most purchases', this.mostPurchased)
          this.purchaseLoading = false;
          // this.chartData = [this.lowQuantityStock?.data.cold_room, this.warehouseDetail?.data.kitchen]

        },
        err=>{
          console.log('low quality error', err);
        }
      )

    }


  getLowQuantityStock(){
    this.lowStockLoading = true;
    this.api.get('dashboard/products/lowstock').subscribe(
      res=>{
        this.lowQuantityStock = res;
        console.log(this.lowQuantityStock)
        this.lowStockLoading = false;
        // this.chartData = [this.lowQuantityStock?.data.cold_room, this.warehouseDetail?.data.kitchen]

      },
      err=>{
        console.log('low quality error', err);
      }
    )

  }


  getOverallInventory(){
    this.laoding = true;
    this.api.get('dashboard/overview').subscribe(
      res=>{
        this.overallInventory = res;
        console.log(this.lowQuantityStock)
      this.laoding = false;

        // this.chartData = [this.lowQuantityStock?.data.cold_room, this.warehouseDetail?.data.kitchen]

      },
      err=>{
        console.log('low quality error', err);
      }
    )

  }

  toggleCalender(){
    this.calender = !this.calender;
  }

}
