import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.scss'
})
export class CreateStaffComponent {
  createEmployeeForm:any;
  file:any;
  isDragging:any;
  isSubmitted:boolean = false;
  loading:boolean = false;
  workingDays:any=[];
  departments:any = [];
  positions:any = [];
  nin: any;
  passport:any

  constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService: MessageService){}


  ngOnInit(): void {
    this.createEmployeeForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      residential_address: ['', [Validators.required]],
      next_of_kin: ['', [Validators.required]],
      date_of_employment: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      working_days: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      bank_name: ['', [Validators.required]],
      salary: ['', [Validators.required]],

    });

    this.getDepartments()
    this.getPositions()
    this.getWorkingDays()
  }

  goBack(){
    window.history.back();
  }

  get f(){return this.createEmployeeForm.controls}

  getDepartments(){
    this.api.get('departments').subscribe(
      res=>{
        this.departments = res
      }, err=>{
        console.log(err);
      }
    )
  }


  getWorkingDays(){
    this.api.get('no_of_working_days').subscribe(
      res=>{
        this.workingDays = res
      }, err=>{
        console.log(err);
      }
    )
  }


  getPositions(){
    this.api.get('roles').subscribe(
      res=>{
        this.positions = res
      }, err=>{
        console.log(err);
      }
    )
  }

  createDepartment() {
    this.isSubmitted = true;
    this.loading = true;
    console.log(this.createEmployeeForm.value);

    if (this.createEmployeeForm.invalid) {
      console.log("form invalid");
      console.log(this.createEmployeeForm.value)
      this.loading = false;
      return;
    }

    let formData:any = new FormData();

    // Append other form data

    formData.append('firstname', this.createEmployeeForm.get('first_name')?.value);
    formData.append('lastname', this.createEmployeeForm.get('last_name')?.value);
    formData.append('email', this.createEmployeeForm.get('email')?.value);
    formData.append('next_of_kin', this.createEmployeeForm.get('next_of_kin')?.value);
    formData.append('date_of_employment', this.createEmployeeForm.get('date_of_employment')?.value);
    formData.append('date_of_birth', this.createEmployeeForm.get('date_of_birth')?.value);
    formData.append('department_id', this.createEmployeeForm.get('department')?.value);
    formData.append('address', this.createEmployeeForm.get('residential_address')?.value);
    formData.append('role_id', this.createEmployeeForm.get('position')?.value);
    formData.append('no_of_working_days_id', this.createEmployeeForm.get('working_days')?.value);

    // Nested bank_details group
    formData.append('account_number', this.createEmployeeForm.get('account_number')?.value);
    formData.append('bank_name', this.createEmployeeForm.get('bank_name')?.value);

    formData.append('salary', this.createEmployeeForm.get('salary')?.value);

    // File uploads (ensure you have File input in the form)
    formData.append('nin', this.nin);
    formData.append('passport', this.passport);

    this.api.post('human-resources/employees', formData).subscribe(
      res => {
        console.log(res);
        this.showSuccess('Product created successfully');
        this.createEmployeeForm.reset();
        this.loading = false;
        this.isSubmitted = false;
      },
      err => {
        console.log(err);
        this.showError('Failed to create product, please try again');
      }
    );
  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
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
    onNinSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.nin = input.files[0];
        console.log(this.nin);
      }
    }

    onPassportSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.passport = input.files[0];
        console.log(this.passport);
      }
    }
}
