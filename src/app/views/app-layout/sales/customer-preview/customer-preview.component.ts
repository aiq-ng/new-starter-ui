import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-preview',
  templateUrl: './customer-preview.component.html',
  styleUrl: './customer-preview.component.scss'
})
export class CustomerPreviewComponent {

  vendorName:any;
    tabMenu= ['Overview']
    item_id:any;
    pageLoading:any;
    customerDetail:any;


    constructor(private router:Router, private api:HttpServiceService){}
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
      return this.api.get('customers/' + this.getParamsId()).subscribe(
        res =>{
          let response:any = res
          this.customerDetail = response.data
          console.log(this.customerDetail)
          this.pageLoading=false;
        }, err=>{
          console.log(err)
          this.pageLoading=false;
        }
      )

    }
    route(page:any){
      this.router.navigate([page]);
    }

}
