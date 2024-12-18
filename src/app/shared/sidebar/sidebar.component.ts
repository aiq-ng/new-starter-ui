import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  dropDown:boolean = false;
  showMobileMenu:boolean = false;
  subMenu:string = '';

    menu = [
      {
        "name": "Dashboard",
        "icon": "assets/icons/grid.png",
        "route": "/app/dashboard",
        "dropdown": ""

      },

      {
        "name": "Procurement",
        "icon": "assets/icons/sales.png",
        "route": "/app/purchases",
        "dropdown": "assets/icons/arrow-right.png",
        "submenu": [
          {
            "name": "Overview",
            "route": "/app/prochurement/overview",
          },
          {
            "name": "Inventory",
            "route": "/app/prochurement/inventory",
          },
          {
            "name": "Purchase Order",
            "route": "/app/prochurement/purchases",
          },
          {
            "name": "Vendors",
            "route": "/app/prochurement/vendors",
          },
        ]

      },
      // {
      //   "name": "Sales",
      //   "icon": "assets/icons/sales.png",
      //   "route": "/app/sales",
      //   "dropdown": "assets/icons/arrow-right.png",
      //   "submenu" : [
      //     {
      //       "name": "Overview",
      //       "route": "/app/sales/overview"
      //     },
      //     {
      //       "name": "Order",
      //       "route": "/app/sales/order",
      //     },
      //     {
      //       "name": "Price List",
      //       "route": "/app/sales/price-list",
      //     },
      //     {
      //       "name": "Customers",
      //       "route": "/app/sales/customers",
      //     },
      //   ]

      // },

      // {
      //   "name": "Accounting",
      //   "icon": "assets/icons/accounting.png",
      //   "route": "/app/accounting/overview",
      //   "dropdown": "assets/icons/arrow-right.png",
      //   "submenu": [
      //     {
      //       "name": "Overview",
      //       "route": "/app/accounting/overview",
      //     },
      //     {
      //       "name": "Order",
      //       "route": "/app/accounting/order",
      //     },
      //     {
      //       "name": "Prochurements",
      //       "route": "/app/accounting/prochurement",
      //     },
      //     {
      //       "name": "Vendors",
      //       "route": "/app/accounting/vendors",
      //     },
      //   ]

      // },

      {
        "name": "Human Resources",
        "icon": "assets/icons/people.png",
        "route": "/app/human-resources",
        "dropdown": ""

      },
      // {
      //   "name": "Reports",
      //   "icon": "assets/icons/report.png",
      //   "route": "/app/reports",
      //   "dropdown": "assets/icons/arrow-right.png"

      // }
    ]

  constructor(private router: Router){}

  ngOnInit() {
  }

  route(page:string){
    this.router.navigate([page]);
  }

  toggleSubmenu(menu:string){
    this.subMenu = menu;
    this.dropDown = !this.dropDown;
  }
}
