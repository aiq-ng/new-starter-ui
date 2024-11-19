import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  @Input() label!: string;
  @Input() bgColor!: string;
  @Input() textColor!: string;
  @Input() isRemovable: boolean = false;

  @Output() btnClick = new EventEmitter();


  onClick(){
    this.btnClick.emit();
  }

}
