import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-sales-order-preview',
  templateUrl: './sales-order-preview.component.html',
  styleUrl: './sales-order-preview.component.scss'
})
export class SalesOrderPreviewComponent {
  item_id:any;
    pageLoading: boolean=false;
    invoiceDetail:any;

    constructor(private api:HttpServiceService){}


    ngOnInit(){
      this.getItemDetail()
    }

    goBack(){
      window.history.back();
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
      return this.api.get('sales/orders/invoice/' + this.getParamsId()).subscribe(
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
