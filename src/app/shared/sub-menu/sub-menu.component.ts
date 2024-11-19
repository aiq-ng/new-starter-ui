import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.scss'
})
export class SubMenuComponent {
  @Input() currentURL!: any;
  @Input() previouseRoute!:any;
  @Output() navigateTo = new EventEmitter<string>();

  navigate() {
    this.navigateTo.emit();
  }

}
