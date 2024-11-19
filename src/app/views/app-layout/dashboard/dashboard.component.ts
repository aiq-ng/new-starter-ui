import { Component } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class DashboardComponent {
    responsiveOptions: any[] | undefined;
    data: any;
    options: any=null;
    metrics: any=null;
    TopSellingProduct: any=null;
    warehouseDetail: any=null;
    pageLoading:boolean=false;
    chartData:any[]=[]
    products = [
      {
        "name": "SPRING ROLLS (CHICKEN)",
        "amountSold": 120,
      },
      {
        "name": "FISH KEBAB",
        "amountSold": 120,
      },
      {
        "name": "Buns",
        "amountSold": 120,
      },
      {
        "name": "MEAT PIE (MINI)",
        "amountSold": 120,
      },
    ]

    constructor(private api:HttpServiceService, private messageService:MessageService){}

    async ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        this.getMetrics()
        this.getTopSellingProducts()


        this.api.get('dashboard/warehouses/details').subscribe(
          res=>{
            this.warehouseDetail = res;
            console.log(this.warehouseDetail)
            this.chartData = [this.warehouseDetail?.data.cold_room, this.warehouseDetail?.data.kitchen]

            console.log('chartData', this.chartData)
            this.data = {
              datasets: [
                  {
                      data: this.chartData,
                      backgroundColor: [
                          documentStyle.getPropertyValue('--red-700'),
                          documentStyle.getPropertyValue('--gray-400')
                      ]
                  }
              ]
          };
          },
          err=>{
            this.showError('Error fetching metrics');
          })

        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }

    getTopSellingProducts(){
      this.pageLoading = true;
      this.api.get('dashboard/products/topselling').subscribe(
        res=>{
          this.TopSellingProduct = res
          console.log(this.TopSellingProduct)
          this.pageLoading = false;
        }
      )
    }

    getMetrics(){
      this.api.get('dashboard/metrics').subscribe(
        res=>{
          this.metrics = res;
          console.log(this.metrics)
        },
        err=>{
          this.showError('Error fetching metrics');
        }
      )
    }

    getWarehouseDetail(){
      this.api.get('dashboard/warehouses/details').subscribe(
        res=>{
          this.warehouseDetail = res;
          console.log(this.warehouseDetail)
          this.chartData = [this.warehouseDetail?.data.cold_room, this.warehouseDetail?.data.kitchen]

          console.log('chartData', this.chartData)
        },
        err=>{
          this.showError('Error fetching metrics');
        }
      )

      return this.chartData
    }

    showError(message:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
