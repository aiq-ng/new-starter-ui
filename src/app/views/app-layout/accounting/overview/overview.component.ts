import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
})
export class OverviewComponent {
  data:any;
  options: any=null;
  calender:any;
  inventoryData:any;
  graphData:any;
  tabMenu = ['Expenses','Bills']


  tableView: any = 'expenses';
  pageLoading: boolean = false;
  tableData: any;
  billsData: any;
  tableHeader = [
    "expense Id",
    "date",
    "Payment Method",
    "Category",
    "Department",
    "Amount",
  ]

  billsTableHeader = [
    "Ref Id",
    "Date",
    "Due Date",
    "Vendor's Name",
    "order Number",
    "Amount",
    "status",

  ]
  orderDetail!: boolean;

  constructor(private api:HttpServiceService, private messageService:MessageService){}

    ngOnInit() {

      this.getGraphData()
      this.getExpense()
      this.getBills();

    }


    toggleCalender(){
      this.calender = !this.calender;
    }

    route(page:string){

    }

    getGraphData(){
      this.api.get(`accounting/graph`).subscribe(
        res=>{
          console.log('got cashflow data')
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');
          const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
          const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

          this.graphData = res;
          let month = this.getMonth(this.graphData.data)
          let revenue = this.transRevenue(this.graphData.data)
          let expense = this.transformExpense(this.graphData.data)
          console.log('month', month, 'cashflow', revenue)

          this.data = {
            labels: month,
            datasets: [

                {
                    label: 'Revenue',
                    data: revenue,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(255,167,38,0.2)'
                },
                {
                  label: 'Expenses',
                  data: expense,
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
          console.log(err);
        }
      )


    }

    getMonth(data: any[]): string[] {
      const months = data.map((item: any) => this.transformMonth(item.month));

      return months;
    }

    transRevenue(data:any){
      console.log('revenue transform', data)
      return data.map((item: any) => item.revenue)
    }

    transformExpense(data:any){
      console.log('expense transform', data)
      return data.map((item: any) => item.expenses)
    }

    transformMonth(month: number): string {
      const monthNames = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
      ];

      // Return the corresponding month name or a fallback
      return monthNames[month - 1] || 'INVALID MONTH';
    }

    filterInventory(value:any){
      console.log(value.toLowerCase())
      if(value.toLowerCase()=='expenses'){
        this.tableView = 'expenses';
      }else if(value.toLowerCase()=='bills'){
        this.tableView = 'bills'
      }else {
        this.tableView = 'expenses'
      }
    }

    getExpense(){
      this.pageLoading= true;
      return this.api.get(`accounting/expenses?page=1&page_size=10`).subscribe(
        res =>{
          let response:any = res
          this.tableData = response.data
          this.pageLoading=false;
        }, err=>{
          console.log(err)
          this.pageLoading=false;
        }
      )

    }

    toggleOrderDetail(id:any){
      this.orderDetail = !this.orderDetail;
    }

    getBills(){
      this.pageLoading= true;
      return this.api.get(`accounting/bills?page=1&page_size=10&start_date=2022-01-01`).subscribe(
        res =>{
          let response:any = res
          this.billsData = response.data
          console.log(this.billsData)
          this.pageLoading=false;
        }, err=>{
          console.log(err)
          this.pageLoading=false;
        }
      )

    }

}
