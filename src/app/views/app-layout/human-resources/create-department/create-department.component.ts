import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.scss'
})
export class CreateDepartmentComponent {
  createDepartmentForm:any;
  saveDeparment:any;
  pageLoading:any;
  positions:any;
  baseSalaryType:any;
  isSubmitted:boolean = false;

  constructor(private fb:FormBuilder, private api:HttpServiceService, private messageService: MessageService){}


  ngOnInit(){
    this.createDepartmentForm = this.fb.group({
      name: ['', Validators.required],
      salary_type: ['', Validators.required],
      base_type_id: [''],
      base_salary: [''],
      description: [''],
    });

    this.getPositions();
    this.getBaseSalaryType()
  }

  get f(){return this.createDepartmentForm.controls}

  createDepartment(){
    this.isSubmitted = true;
    if(this.createDepartmentForm.invalid){
    console.log(this.createDepartmentForm.value);
    console.log('Invalid form')
      return;
    }

    console.log(this.createDepartmentForm.value);
    this.api.post('human-resources/departments', this.createDepartmentForm.value).subscribe(
      res=>{
        console.log(res)
        this.showSuccess('Department created successfully');
        this.createDepartmentForm.reset();
      },
      err=>{
        console.log(err)
        this.showError('Failed to create department');
      }
    )
  }

  getPositions(){
    this.pageLoading = true;
    this.api.get('roles').subscribe(
      res=>{
        this.positions = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
      }
    )
  }

  getBaseSalaryType(){
    this.pageLoading = true;
    this.api.get('base-pay-types').subscribe(
      res=>{
        this.baseSalaryType = res;
        this.pageLoading = false;
      },
      err=>{
        console.log(err)
      }
    )
  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
