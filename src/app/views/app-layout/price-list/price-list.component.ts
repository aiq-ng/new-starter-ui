import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.scss'
})
export class PriceListComponent {
  constructor(
    private router: Router,
  ){}
  route(page:string){
    this.router.navigateByUrl(page);
  }
}
