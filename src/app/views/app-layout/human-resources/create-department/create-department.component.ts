import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.scss'
})
export class CreateDepartmentComponent {
  createDepartmentForm:any;

  constructor(private fb:FormBuilder){}


  ngOnInit(){
  }

  createDepartment(){
    // TODO: Implement logic to create a new department
  }

}
