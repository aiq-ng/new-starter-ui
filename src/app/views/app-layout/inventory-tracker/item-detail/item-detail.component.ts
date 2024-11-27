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
  adjustStock:boolean = false;
  adjustmentType:string = 'minus';
  editStock:boolean = false;

  constructor(private router: Router){}
  
  adjustStockToggle(){
    this.adjustStock =!this.adjustStock;
  }
  route(page:string){
    this.router.navigateByUrl(page);
  }

  selectAdjustmentType(adjustmentType:string){
    this.adjustmentType = adjustmentType;
  }

  editItemToggle(){
    this.route('/app/prochurement/edit-item/1');
  }

}
