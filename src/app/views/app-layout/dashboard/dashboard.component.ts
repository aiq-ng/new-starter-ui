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
    calender:boolean=false;
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

    ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [

              {
                  label: 'Cash Flow',
                  data: [12, 51, 62, 33, 21, 62, 45],
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--orange-500'),
                  tension: 0.4,
                  backgroundColor: 'rgba(255,167,38,0.2)'
              }
          ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                  display: false,
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                  display: false,
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

    toggleCalender(){
      this.calender = !this.calender;
    }

    showError(message:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
