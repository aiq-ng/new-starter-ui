import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-purchase-order-preview',
  templateUrl: './purchase-order-preview.component.html',
  styleUrl: './purchase-order-preview.component.scss'
})
export class PurchaseOrderPreviewComponent {
  item_id:any;
  pageLoading: boolean=false;
  invoiceDetail:any;

  constructor(private api:HttpServiceService){}


  ngOnInit(){
    this.getItemDetail()
  }

  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.item_id = segments[segments.length - 1];

    return this.item_id;
  }

  getItemDetail(){
    this.pageLoading= true;
    return this.api.get('purchases/orders/invoice/' + this.getParamsId()).subscribe(
      res =>{
        let response:any = res
        this.invoiceDetail = response.data
        console.log(this.invoiceDetail)
        this.pageLoading=false;
      }, err=>{
        console.log(err)
        this.pageLoading=false;
      }
    )

  }

}
