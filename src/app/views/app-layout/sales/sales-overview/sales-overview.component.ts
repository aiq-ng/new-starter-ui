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
  events:any = [];
  eventsLoading:boolean = false;
  data: any;
  options: any=null;
  chartData:any;
  graphFilter:any;
  currentFilter:any = 'year';

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
    this.getRevenue('year')
    this.getEvents()
  }

  route(page:string){
    this.router.navigate([page]);
  }

  goBack(){
    window.history.back();
  }

  getRevenue(filter:string){
    this.currentFilter = filter;
    this.api.get(`sales/graph?period=${filter}`).subscribe(
      res=>{
        console.log('got cashflow data')
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        let revenueData:any = res;
        this.chartData = revenueData;
        let period = this.getPeriod(revenueData.data, this.currentFilter)
        let revenue = this.transCashFlow(revenueData.data)
        console.log('month', period, 'cashflow', revenue)

        this.data = {
          labels: period,
          datasets: [

              {
                  label: 'Cash Flow',
                  data: revenue,
                  fill: true,
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
        console.log(err)
      }
    )


  }

  getPeriod(data:any, currenFilter:string) {

    if(currenFilter=='year'){
      const months = data.map((item: any) => this.transformMonth(item.period));
      return months;
    } else if(currenFilter=='month'){
      const weeks = data.map((item: any) => this.transformWeek(item.period));
      return weeks;
    }else {
      console.log('issue with currenFilter')
    }

  }

  transCashFlow(data:any){
    console.log('revenue transform', data)
    return data.map((item: any) => item.revenue)
  }

  transformMonth(month: number): string {
    const monthNames = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    // Return the corresponding month name or a fallback
    return monthNames[month - 1] || 'INVALID MONTH';
  }

  transformWeek(week: number): string {
    const weekNames = [
      '1 WEEK AGO', '2 WEEK AGO', '3 WEEK AGO', '4 WEEKS AGO'
    ];

    // Return the corresponding week name or a fallback
    return weekNames[week - 1] || 'INVALID WEEK';
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


  getEvents(){
    this.eventsLoading = true;
    this.api.get('sales/upcoming-events?page=1&page_size=2').subscribe(
      res=>{
        this.events = res;
        this.eventsLoading = false;

        console.log(this.events)
      },
      err=>{
        console.log(err)
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
