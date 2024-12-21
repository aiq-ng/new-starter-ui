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
    events:any;
    cashFlow:any;
    TopSellingProduct: any= [];
    lowQuantityStock: any=[];
    pageLoading:boolean=false;
    loading:boolean=false;
    calender:boolean=false;
    chartData:any[]=[]


    constructor(
                private api:HttpServiceService,
                private messageService:MessageService,
              ){}

    ngOnInit() {




    this.getMetrics();
    this.getTopSellingProducts(1, 10);
    this.getLowQuantityStock();
    this.getEvents();
    this.getCashFlow('2024');
    }


    getTopSellingProducts(pageNumber:number, numberPerPage:number){
      this.pageLoading = true;
      this.api.get(`dashboard/products/topselling?page=${pageNumber}&page_size=${numberPerPage}`).subscribe(
        res=>{
          this.TopSellingProduct = res
          console.log('Top selling', this.TopSellingProduct)
          this.pageLoading = false;
        }
      )
    }

    getMetrics(){
      this.loading=true;
      this.api.get('dashboard/business').subscribe(
        res=>{
          this.metrics = res;
          console.log(this.metrics)
          this.loading = false;
        },
        err=>{
          this.showError('Error fetching metrics');
        }
      )
    }

    getEvents(){
      this.api.get('sales/upcoming-events?page=1&page_size=2').subscribe(
        res=>{
          this.events = res;
          console.log(this.events)
        },
        err=>{
          this.showError('Error fetching metrics');
        }
      )
    }

    getCashFlow(year:string){
      let cashFlowData:any;
      this.api.get(`dashboard/cashflow?year=${year}`).subscribe(
        res=>{
          console.log('got cashflow data')
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');
          const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
          const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

          cashFlowData = res;
          let month = this.getMonth(cashFlowData.data)
          let cashFlow = this.transCashFlow(cashFlowData.data)
          console.log('month', month, 'cashflow', cashFlow)

          this.data = {
            labels: month,
            datasets: [

                {
                    label: 'Cash Flow',
                    data: cashFlow,
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


        },
        err=>{
          this.showError('Error fetching metrics');
        }
      )


      return cashFlowData
    }

    getMonth(data: any[]): string[] {
      const months = data.map((item: any) => this.transformMonth(item.month));

      return months;
    }

    transCashFlow(data:any){
      console.log('cashflow transform', data)
      return data.map((item: any) => item.cash_flow)
    }

    transformMonth(month: number): string {
      const monthNames = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
      ];

      // Return the corresponding month name or a fallback
      return monthNames[month - 1] || 'INVALID MONTH';
    }



    getLowQuantityStock(){
      this.api.get('dashboard/products/lowstock').subscribe(
        res=>{
          this.lowQuantityStock = res;
          console.log(this.lowQuantityStock)
          // this.chartData = [this.lowQuantityStock?.data.cold_room, this.warehouseDetail?.data.kitchen]

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
