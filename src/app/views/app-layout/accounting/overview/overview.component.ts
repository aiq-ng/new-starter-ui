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
  tabMenu = ['Expenses','Bills']


  tableHeader = ['Name', 'BuyingPrice', 'Quantity', 'Threshold Value', 'Expiry Date', 'SKU', 'Availability']

  constructor(private api:HttpServiceService, private messageService:MessageService){}

    ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [

              {
                  label: 'Cash Flow',
                  data: [800000, 450000, 900000, 1000000, 635000, 245000, 450000, 1200000, 780000, 540000, 1000000],
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

    this.inventoryData = [
      {
        Name: "Apple",
        BuyingPrice: 1.2,
        Quantity: 50,
        ThresholdValue: 10,
        ExpiryDate: "2024-12-10",
        SKU: "FRU-APL-001",
        Availability: "Available"
      },
      {
        Name: "Milk",
        BuyingPrice: 0.8,
        Quantity: 30,
        ThresholdValue: 5,
        ExpiryDate: "2024-11-25",
        SKU: "DAI-MLK-002",
        Availability: "Available"
      },
      {
        Name: "Bread",
        BuyingPrice: 1.0,
        Quantity: 20,
        ThresholdValue: 8,
        ExpiryDate: "2024-11-22",
        SKU: "BKE-BRD-003",
        Availability: "Available"
      },
      {
        Name: "Butter",
        BuyingPrice: 2.5,
        Quantity: 15,
        ThresholdValue: 4,
        ExpiryDate: "2024-12-05",
        SKU: "DAI-BTR-004",
        Availability: "Low Stock"
      },
      {
        Name: "Carrot",
        BuyingPrice: 0.5,
        Quantity: 100,
        ThresholdValue: 20,
        ExpiryDate: "2024-12-15",
        SKU: "VEG-CAR-005",
        Availability: "Available"
      }
    ];

    }


    toggleCalender(){
      this.calender = !this.calender;
    }

    route(page:string){

    }

}
