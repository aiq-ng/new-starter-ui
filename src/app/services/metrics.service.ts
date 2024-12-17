import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  constructor(private http: HttpClient, private api:HttpServiceService, private authService: AuthService) { }


  getTopSellingProducts(pageNumber:number, numberPerPage:number){
    this.api.get(`dashboard/products/topselling?page=${pageNumber}&page_size=${numberPerPage}`).subscribe(
      res=>{
        let topSelling = res
        return topSelling
      },err=>{
        console.log('top selling error', err)
      }
    )
  }

  getMetrics(){
    return this.api.get('dashboard/business')
  }

  getEvents(){
    this.api.get('dashboard/business').subscribe(
      res=>{
        let events = res;
        console.log('events', events)
        return events;
      },
      err=>{
        console.log('events erro', err)
      }
    )
  }

  getCashFlow(){
    this.api.get('dashboard/business').subscribe(
      res=>{
        let cashFlow = res;
        console.log('Cashflow', cashFlow)
        return cashFlow
      },
      err=>{
        console.log('cashflow error', err)
      }
    )
  }

  getLowQuantityStock(){
    this.api.get('dashboard/products/lowstock').subscribe(
      res=>{
        let lowQuantityStock = res;
        console.log('low quantity stock', lowQuantityStock)
        // this.chartData = [this.lowQuantityStock?.data.cold_room, this.warehouseDetail?.data.kitchen]

        return lowQuantityStock;

      },
      err=>{
        console.log('low stock error', err)
      }
    )

  }


}
