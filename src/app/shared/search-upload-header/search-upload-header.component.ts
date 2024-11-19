import { Component } from '@angular/core';

@Component({
  selector: 'app-search-upload-header',
  templateUrl: './search-upload-header.component.html',
  styleUrl: './search-upload-header.component.scss'
})
export class SearchUploadHeaderComponent {
  dropDown:boolean = false;


  showDropDown(){
    this.dropDown =!this.dropDown;
  }
}
