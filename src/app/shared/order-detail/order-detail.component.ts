import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  tableHeader:any=['description', 'qyt', 'price', 'discount', 'subtotal']

  tableData:any = [
    {
      'description': 'peppered Snail Corn(large)',
      'quantity': '2(pcs)',
      'price': '20,000',
      'discount': '0%',
      'subtotal': '20,000'
    },
    {
      'description': 'Small Chops Maxi Pack(large)',
      'quantity': '1(pcs)',
      'price': '35,000',
      'discount': '0%',
      'subtotal': '35,000'
    },
  ]


  constructor(private router:Router){}

  ngOnInit(){}


  route(page:any){
    this.router.navigate([page]);
  }

}
