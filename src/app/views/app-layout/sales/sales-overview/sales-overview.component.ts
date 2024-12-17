import { Component } from '@angular/core';


@Component({
  selector: 'app-sales-overview',
  templateUrl: './sales-overview.component.html',
  styleUrl: './sales-overview.component.scss'
})
export class SalesOverviewComponent {
  inventoryData:any;
  objectKeys(obj: any){
    return Object.keys(obj  )
  }

  tableHeader = [
    "Name",
    "Quantity (pcs)",
    "Rate",
    "Amount",
  ]
  ngOnInit(){
  this.inventoryData = [
    {
      Name: "Samosa (beef)",
      Quantity: "600",
      Rate: "400.00",
      Amount: "₦ 240,000"
    },
    {
      Name: "Spring rolls Veg",
      Quantity: "518",
      Rate: "350.00",
      Amount: "₦ 181,300"
    },
    {
      Name: "Stickmeat",
      Quantity: "316",
      Rate: "600.00",
      Amount: "₦ 189,600"
    },
    {
      Name: "Box",
      Quantity: "600",
      Rate: "1000.00",
      Amount: "₦ 600,000"
    },
    {
      Name: "Shawarma",
      Quantity: "600",
      Rate: "400.00",
      Amount: "₦ 240,000"
    },
   
  
]
  }

  events = [
    {
      date: new Date(2023, 10, 10),
      title: 'Mr&Mrs Augustine Wedding',
      description:
        'Supply an exquisite spread is planned featuring tender chicken dishes, a generous serving of rice, and a variety of delightful small chops... ',
      time: '25 April at 09:30 am',
    },
    {
      date: new Date(2023, 10, 14),
      title: 'Maxwell Book Lunch',
      description:
        'Supply an exquisite spread is planned featuring tender chicken dishes, a generous serving of rice, and a variety of delightful small chops... ',
      time: '25 April at 09:30 am',
    },
  ];


  


}
