import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {
  signout:boolean = false;
  loading:boolean = false;

  constructor(private router: Router){}

  ngOnInit(){}

  toggleSignout(){
    this.signout = !this.signout;
  }

  signOut(){
    this.router.navigateByUrl('auth/login')
  }

}
