import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.scss'
})
export class VendorDetailComponent {
  vendorName:any;
  tabMenu= ['Overview', 'transactions']
  constructor(private router:Router){}

  ngOnInit(){
    this.vendorName = 'Agro Tech';
  }

  route(page:any){
    this.router.navigate([page]);
  }

}
