import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-overview',
  templateUrl: './sales-overview.component.html',
  styleUrl: './sales-overview.component.scss'
})
export class SalesOverviewComponent {
  calender:any;
  laoding:boolean = false;
  purchaseLoading:boolean = false;
  vendorLoading:boolean = false;
  topSellingStock:any;

  salesOverview:any;
  tableHeader = [
    "Name",
    "Quantity(pcs)",
    "Rate",
    "Amount"
  ]

  constructor(private api: HttpServiceService, private router:Router) { };

  ngOnInit(){
    this.getTopSelling()
    this.getOverview()
  }

  route(page:string){
    this.router.navigate([page]);
  }

  goBack(){
    window.history.back();
  }

  getTopSelling(){
    this.vendorLoading = true;
    this.api.get('sales/stocks/topselling?page=1&page_size=10').subscribe(
      res=>{
        this.topSellingStock = res;
        console.log(this.topSellingStock)
        // this.chartData = [this.lowQuantityStock?.data.cold_room, this.warehouseDetail?.data.kitchen]
        this.vendorLoading = false;
      },
      err=>{
        console.log('Top selling error', err);
      }
    )

  }


  getOverview(){
    this.laoding = true;
    this.api.get('sales/overview?when=yesterday').subscribe(
      res=>{
        this.salesOverview = res;
        console.log(this.salesOverview)
      this.laoding = false;

        // this.chartData = [this.lowQuantityStock?.data.cold_room, this.warehouseDetail?.data.kitchen]

      },
      err=>{
        console.log('Sales overview error', err);
      }
    )

  }

  toggleCalender(){
    this.calender = !this.calender;
  }

}
