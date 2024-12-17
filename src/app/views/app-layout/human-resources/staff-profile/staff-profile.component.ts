import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.scss'
})
export class StaffProfileComponent {
  item_id:any;
  pageLoading:any;
  employeeDetail:any;


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
    return this.api.get('human-resources/employees/' + this.getParamsId()).subscribe(
      res =>{
        let response:any = res
        this.employeeDetail = response.data
        console.log(this.employeeDetail)
        this.pageLoading=false;
      }, err=>{
        console.log(err)
        this.pageLoading=false;
      }
    )

  }


}
