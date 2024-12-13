import { Component } from '@angular/core';

@Component({
  selector: 'app-prochurement-overview',
  templateUrl: './prochurement-overview.component.html',
  styleUrl: './prochurement-overview.component.scss'
})
export class ProchurementOverviewComponent {
  calender:any;


  toggleCalender(){
    this.calender = !this.calender;
  }

}
