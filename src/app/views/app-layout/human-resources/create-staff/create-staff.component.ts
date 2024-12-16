import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.scss'
})
export class CreateStaffComponent {
  createEmployeeForm:any;
  file:any;
  isDragging:any;

  constructor(private fb:FormBuilder){}


  ngOnInit(){
  }

  createDepartment(){
    // TODO: Implement logic to create a new department
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }
    // Handle drag leave
    onDragLeave(event: DragEvent): void {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging = false;
    }

    // Handle file drop
    onDrop(event: DragEvent): void {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging = false;

      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        this.file = event.dataTransfer.files[0];
      }
    }

    // Handle file selection
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.file = input.files[0];
      }
    }
}
