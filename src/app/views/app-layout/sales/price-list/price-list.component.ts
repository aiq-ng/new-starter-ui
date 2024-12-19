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

  isListCreated: boolean = false; // Toggles between empty state and filled price list
  isPriceOverview: boolean = false; // Switches between price list and price overview

  // Sample price list data
  priceList = [
    { name: 'SPRING ROLLS (VEG. ONLY)', price: 350, quantity: '10 PCS' },
    { name: 'FISH BALLS', price: 600, quantity: '10 PCS' },
    { name: '8 PUFF PUFF', price: 70, quantity: '30 PCS' },
    { name: 'BUNS', price: 500, quantity: '30 PCS' },
  ];

 
}
