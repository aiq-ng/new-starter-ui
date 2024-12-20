import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  @Input() invoiceData:any;
  @Input() loading:boolean = true;
  @Input() confirmPaymentLoading:boolean = false;
  @Output() action = new EventEmitter();
  tableHeader:any=['description', 'qyt', 'price', 'discount', 'subtotal']


  constructor(private router:Router){}

  ngOnInit(){}

  onClick(){
    this.action.emit();
  }

  route(page:any){
    this.router.navigate([page]);
  }

}
