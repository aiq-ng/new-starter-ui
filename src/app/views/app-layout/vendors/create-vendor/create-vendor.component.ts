import { Component } from '@angular/core';

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrl: './create-vendor.component.scss'
})
export class CreateVendorComponent {
  tabMenu = ['Other details','Address']
  tab:string = 'other'


  toggleTab(view:string){
    this.tab = view;
  }

}
