import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent {
  tabMenu = ['All','Low stock', 'In-Stock', 'Out of Stock']
  item:any = 'Kings Oil'

  constructor(private router: Router){}
  
  route(page:string){
    this.router.navigateByUrl(page);
  }

}
