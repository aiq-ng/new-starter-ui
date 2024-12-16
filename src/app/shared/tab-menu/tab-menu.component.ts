import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrl: './tab-menu.component.scss'
})
export class TabMenuComponent {
  currentMenu:any;
  @Input() navigation:any;
  @Output() tabAction = new EventEmitter();

  constructor(private router:Router) {}

  ngOnInit(){
   this.currentMenu = this.navigation[0]
  }

  onClick(){
    this.tabAction.emit();
  }

  toggleTab(menu:string){
    this.currentMenu = menu;
    console.log(this.currentMenu)
  }


  route(page:string){
    this.router.navigate([page]);
  }


}
