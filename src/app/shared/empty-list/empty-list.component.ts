import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrl: './empty-list.component.scss'
})
export class EmptyListComponent {
  @Input() message!: string;
  @Input() buttonName!: string;
  @Input() buttonIcon!: string;
  @Output() add = new EventEmitter();


  onclick(){
    this.add.emit();
  }
}
