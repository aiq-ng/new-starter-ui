import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-list-overview',
  templateUrl: './price-list-overview.component.html',
  styleUrl: './price-list-overview.component.scss'
})
export class PriceListOverviewComponent {
  
  inventoryData:any;
  @Output() viewAction = new EventEmitter();

  constructor(private router: Router){}
  
  tableHeader = [
    "S/N",
    "Item",
    "Unit Price",
    "Minimum Order Quantity",
    "Action"
  ]

  objectKeys(obj: any){
    return Object.keys(obj  )
  }

  onClick(){
    this.viewAction.emit();
    console.log('view action triggered')
  }
  route(arg0: string) {
    this.router.navigateByUrl(arg0);
    // throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
  
    this.inventoryData = [
      {
        SN: "1",
        Item: "SPRING ROLLS (VEG ONLY)",
        UnitPrice: "₦350",
        MinimumOrderQuantity: "10PCS",
       
      },
      {
        SN: "2",
        Item: "SPRING ROLLS (VEG ONLY)",
        UnitPrice: "₦350",
        MinimumOrderQuantity: "10PCS",
      },
      {
        SN: "3",
        Item: "PUFF PUFF",
        UnitPrice: "₦50",
        MinimumOrderQuantity: "70PCS",
      },
      {
        SN: "4",
        Item: "BUNS",
        UnitPrice: "₦50",
        MinimumOrderQuantity: "85PCS",
      },
     
  ]
  }
  

  activeTab: string = 'allOrders'; 
  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
