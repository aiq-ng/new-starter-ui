import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../../../../services/http-service.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.scss'
})
export class VendorDetailComponent {
  vendorName:any;
  tabMenu= ['Overview', 'transactions']
  item_id:any;
  pageLoading:any;
  vendorDetail:any;


  constructor(private router:Router, private api:HttpServiceService){}
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
    return this.api.get('vendors/' + this.getParamsId()).subscribe(
      res =>{
        let response:any = res
        this.vendorDetail = response.data
        console.log(this.vendorDetail)
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
