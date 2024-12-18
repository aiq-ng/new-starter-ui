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
      residential_address: ['', [Validators.required]],
      next_of_kin: ['', [Validators.required]],
      date_of_employment: ['', [Validators.required]],
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
      return;
    }

    let formData:any = new FormData();

    // Append other form data

    this.nin.forEach((file: any) => {
      formData.append(`nin`, file, file.name);  // Append each file with the key media[]
    });

    this.passport.forEach((file: any) => {
      formData.append(`pasport`, file, file.name);  // Append each file with the key media[]
    });

    formData.append('first_name', this.createEmployeeForm.get('first_name')?.value);
    formData.append('last_name', this.createEmployeeForm.get('last_name')?.value);
    formData.append('residential_address', this.createEmployeeForm.get('residential_address')?.value);
    formData.append('next_of_kin', this.createEmployeeForm.get('next_of_kin')?.value);
    formData.append('date_of_employment', this.createEmployeeForm.get('date_of_employment')?.value);
    formData.append('department', this.createEmployeeForm.get('department')?.value);
    formData.append('position', this.createEmployeeForm.get('position')?.value);
    formData.append('working_days', this.createEmployeeForm.get('working_days')?.value);

    // Nested bank_details group
    formData.append('account_number', this.createEmployeeForm.get('bank_details.account_number')?.value);
    formData.append('bank_name', this.createEmployeeForm.get('bank_details.bank_name')?.value);

    formData.append('salary', this.createEmployeeForm.get('salary')?.value);

    // File uploads (ensure you have File input in the form)
    formData.append('upload_nin', this.createEmployeeForm.get('upload_nin')?.value);
    formData.append('upload_passport', this.createEmployeeForm.get('upload_passport')?.value);

    this.api.post('inventory/items', formData).subscribe(
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
    onFileSelected(event: any, imageType:string): void {
      console.log('selection function hit');

      // Store all selected files
      let file = Array.from(event.target.files);  // Converts FileList to an array of files


      if(imageType=='nin'){
        if (event.target.files && event.target.files[0]) {
          const nin = event.target.files[0];

        }
      }else if(imageType=='passport'){
        if (event.target.files && event.target.files[0]) {
          const passport = event.target.files[0];

        }
      }
    }
}
