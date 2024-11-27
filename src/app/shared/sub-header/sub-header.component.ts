import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {
 @Input() pageTitle!:string;
 @Input() action1Name!:string;
 @Input() action2Name!:string;
 @Input() action3Name!:string;
 @Input() buttonStyle!:string;
 @Input() buttonStyle2!:string;
 @Input() monthlyFilter:boolean = false;
 @Input() icon!:string;
 @Input() icon2!:string;
 @Output() action1= new EventEmitter()
 @Output() action2= new EventEmitter()
 @Output() action3= new EventEmitter()

 calender:boolean = false;


 action1Click() {
   this.action1.emit();
 }

 action2Click() {
   this.action2.emit();
 }

 action3Click() {
   this.action3.emit();
 }

 toggleCalender(){
  this.calender = !this.calender;
 }

}
