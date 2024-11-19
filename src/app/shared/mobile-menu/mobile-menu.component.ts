import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {
  @Output() toggleMenu = new EventEmitter();

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

  constructor(private router: Router){}


  route(page:string){
    this.router.navigate([page]);
  }

  onclick(){
    this.toggleMenu.emit();
  }


}
