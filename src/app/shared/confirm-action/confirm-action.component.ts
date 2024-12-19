import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrl: './confirm-action.component.scss'
})
export class ConfirmActionComponent {
  show:boolean = false;
  @Input() title!: string;
  @Input() message: string = 'Are you sure you want to perform this action?';
  @Output() confirmAction = new EventEmitter<boolean>();
  @Output() exit = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(){
    this.show = true;
    console.log('trigger')
  }

  confirm() {
    this.confirmAction.emit();
    this.onExit()
  }

  onExit(){
    this.exit.emit();
  }



}
