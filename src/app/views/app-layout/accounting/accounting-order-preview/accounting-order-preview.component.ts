import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-accounting-order-preview',
  templateUrl: './accounting-order-preview.component.html',
  styleUrl: './accounting-order-preview.component.scss'
})
export class AccountingOrderPreviewComponent {
      tem_id:any;
      pageLoading: boolean=false;
      invoiceDetail:any;
      item_id:any;

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
        return this.api.get('' + this.getParamsId()).subscribe(
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
