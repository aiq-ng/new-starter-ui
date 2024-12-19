import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dropDown:boolean = false;
  showMobileMenu:boolean = false;
  user:any;

    menu = [
      {
        "name": "dashboard",
        "icon": "assets/icons/layout.png",
        "route": "/app/dashboard"
      },
      {
        "name": "products",
        "icon": "assets/icons/package.png",
        "route": "/app/products"

      },
      {
        "name": "purchases",
        "icon": "assets/icons/reciept.png",
        "route": "/app/purchases"

      },
      {
        "name": "sales",
        "icon": "assets/icons/cart.png",
        "route": "/app/sales"
      },
      {
        "name": "inventory plan",
        "icon": "assets/icons/achive.png",
        "route": "/app/inventory-tracker"

      }
    ]

  constructor(private router: Router, private api:HttpServiceService, private storage:StorageService){}

  ngOnInit() {
    this.getUser()
  }

  route(page:string){
    this.router.navigate([page]);
  }

  showDropDown(){
    this.dropDown = !this.dropDown
  }

  getUser(){
    this.api.get('human-resources/employees/' + this.storage.getdata('user_id')).subscribe(
      res=>{
        this.user = res
      }, err=>{
        console.log(err);
      }
    )
  }

  toggleMobileMenu(){
    console.log('show mobile menu');
    this.showMobileMenu =!this.showMobileMenu;
  }
}
