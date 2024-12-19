import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.scss',
  providers: [MessageService]  // Import the MessageService in your component
})
export class StaffProfileComponent {
  item_id:any;
  pageLoading:any;
  employeeDetail:any;
  confirmAction:any;


  constructor(private router:Router, private api:HttpServiceService, private messageService:MessageService){}
  ngOnInit(){
    this.getItemDetail()
  }

  goBack(){
    window.history.back();
  }

  getParamsId(){
    const url = window.location.href;
    console.log('url', url);
    const segments = url.split('/');
    this.item_id = segments[segments.length - 1];

    return this.item_id;
  }

  getItemDetail(){
    this.pageLoading= true;
    return this.api.get('human-resources/employees/' + this.getParamsId()).subscribe(
      res =>{
        let response:any = res
        this.employeeDetail = response.data
        console.log(this.employeeDetail)
        this.pageLoading=false;
      }, err=>{
        console.log(err)
        this.pageLoading=false;
      }
    )

  }

  deleteEmployee(){
    this.pageLoading= true;
    return this.api.delete(`human-resources/employees/${this.item_id}`).subscribe(
      res =>{
        let response:any = res
        this.showSuccess('Employee Deleted successfully')
        this.router.navigate(['/app/human-resources'])
      }, err=>{
        console.log(err)
        this.showError('Error deleting employee')
      }
    )

  }


  suspendEmployee(){
    this.pageLoading= true;
    return this.api.post(`human-resources/employees/${this.item_id}/suspend`, '').subscribe(
      res =>{
        let response:any = res
        this.showSuccess('Employee suspended')
      }, err=>{
        console.log(err)
        this.showError('Error putting employee on suspention')
      }
    )

  }

  putOnLeave(){
    this.pageLoading= true;
    return this.api.post(`human-resources/employees/leave/${this.item_id}/approve`, '').subscribe(
      res =>{
        let response:any = res
        this.showSuccess('Employee is now on leave')
      }, err=>{
        console.log(err)
        this.showError('An error occurred, are you sure employee applied to go on leave?')
      }
    )

  }

  toggleConfirmAction(action:string){
    this.confirmAction = action
  }

  exitConfirmModal(){
    this.confirmAction = null;
  }

  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
