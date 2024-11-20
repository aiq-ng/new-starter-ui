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

    menu = [
      {
        "name": "dashboard",
        "icon": "assets/icons/grid.png",
        "route": "/app/dashboard",
        "dropdown": ""

      },
      {
        "name": "Inventory",
        "icon": "assets/icons/inventory.png",
        "route": "/app/inventory",
        "dropdown": ""

      },
      {
        "name": "Invoice",
        "icon": "assets/icons/invoice.png",
        "route": "/app/invoice",
        "dropdown": ""

      },
      {
        "name": "Qoute",
        "icon": "assets/icons/qoute.png",
        "route": "/app/qoute",
        "dropdown": ""
      },
      {
        "name": "Sales Order",
        "icon": "assets/icons/sales.png",
        "route": "/app/sales",
        "dropdown": ""

      },
      {
        "name": "Accounting",
        "icon": "assets/icons/accounting.png",
        "route": "/app/accounting",
        "dropdown": "assets/icons/arrow-right.png"

      },
      {
        "name": "Procurement",
        "icon": "assets/icons/procurement.png",
        "route": "/app/procurement",
        "dropdown": "assets/icons/arrow-right.png"

      },
      {
        "name": "Expenses",
        "icon": "assets/icons/procurement.png",
        "route": "/app/expenses",
        "dropdown": "assets/icons/arrow-right.png"

      },
      {
        "name": "Customers",
        "icon": "assets/icons/people.png",
        "route": "/app/customers",
        "dropdown": ""

      },
      {
        "name": "Human Resources",
        "icon": "assets/icons/people.png",
        "route": "/app/human-resources",
        "dropdown": ""

      },
      {
        "name": "Reports",
        "icon": "assets/icons/report.png",
        "route": "/app/reports",
        "dropdown": "assets/icons/arrow-right.png"

      }
    ]

  constructor(private router: Router){}

  ngOnInit() {
  }

  route(page:string){
    this.router.navigate([page]);
  }
}
