import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { StorageService } from '../../services/storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [MessageService]  // Import MessageService to use it in the component
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

  constructor(
              private router: Router,
              private api:HttpServiceService,
              private storage:StorageService,
              private messageService:MessageService
            ){}

  ngOnInit() {
    this.getUser()
  }

  route(page:string){
    this.router.navigate([page]);
  }

  showDropDown(){
    this.dropDown = !this.dropDown
  }

  logout(){
    this.api.get('auth/logout').subscribe(
      res=>{
        this.showSuccess('logged out successfully!')
        this.route('/auth/login')
      }, err=>{
        this.showError('error logging out, Please try again')
      }
    )
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

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
