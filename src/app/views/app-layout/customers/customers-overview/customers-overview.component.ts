import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-overview',
  templateUrl: './customers-overview.component.html',
  styleUrl: './customers-overview.component.scss'
})
export class CustomersOverviewComponent {
  customerOne:any[] = [];
  customers:any[] = [];
  pageLoading: boolean = false;
  selectedCustomer: any = null;
  constructor(
    private api:HttpServiceService,
    private router: Router,
    private messageService: MessageService
 ){}

 
 route(arg0: string) {
  this.router.navigateByUrl(arg0);
  // throw new Error('Method not implemented.');
  }

  
  getCustomers(page: number = 1) {
    this.pageLoading = true;
    this.api.get('customers')
      .subscribe(
       (res:any) => {
          this.customers = res.data;
          console.log(this.customers);
          this.pageLoading = false;

          if (this.customers.length) {
            this.selectCustomer(this.customers[0].id);
          }
         
       },
         (err) => {
          console.log(err);
          this.showError('Failed to load sales data');
          this.pageLoading = false;
        }
      );
  }

  
  getCustomerDetails(customerId: number) {
    this.pageLoading = true;
    this.api.get('customers/1')
      .subscribe(
       (res:any) => {
          this.selectedCustomer = res.data; // Update selected customer details
           console.log('Selected Customer Details:', this.selectedCustomer);
          this.pageLoading = false;
       },
         (err) => {
          console.log(err);
          this.showError('Failed to load sales data');
          this.pageLoading = false;
        }
      );
  }

  ngOnInit() {
    this.selectedCustomer = this.customers[0]; // Default selection
    this.getCustomers();
  }

  selectCustomer(customerId: any) {
    this.getCustomerDetails(customerId);
  }

  // customersdata = [
  //   {
  //     name: 'Mr. Maxwell',
  //     email: 'maxwell@example.com',
  //     phone: '+2348012345678',
  //     amount: '₦1,500,000',
  //     status: 'Owing',
  //     type: 'Individual',
  //     currency: 'NGN',
  //     paymentTerms: 'Net 30',
  //     transactions: [
  //       {
  //         date: '02 Nov 2024 03:35 PM',
  //         description: 'Invoice Added',
  //         details: 'Invoice INV-000001 emailed by Susan Daniel',
  //         currency: 'NGN',
  //         receivables: '₦500,000',
  //         paid: '₦300,000'
  //       },
  //       {
  //         date: '31 Nov 2024 03:35 PM',
  //         description: 'Invoice Added',
  //         details: 'Invoice INV-000001 emailed by Susan Daniel',
  //         currency: 'NGN',
  //         receivables: '₦400,000',
  //         paid: '₦200,000'
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Agro Tech',
  //     email: 'agrotech@example.com',
  //     phone: '+2347032345678',
  //     amount: '₦2,000,000',
  //     status: 'Paid',
  //     type: 'Business',
  //     currency: 'NGN',
  //     paymentTerms: 'Net 60',
  //     transactions: [],
  //   },
  //   {
  //     name: 'Maxwell Book Launch',
  //     email: 'agrotech@example.com',
  //     phone: '+2347032345678',
  //     amount: '₦1,500,000',
  //     status: 'Due in 5 days',
  //     type: 'Business',
  //     currency: 'NGN',
  //     paymentTerms: 'Net 60',
  //     transactions: [
  //       {
  //         date: '02 Nov 2024 03:35 PM',
  //         description: 'Invoice Added',
  //         details: 'Invoice INV-000001 emailed by Susan Daniel',
  //         currency: 'NGN',
  //         receivables: '₦500,000',
  //         paid: '₦300,000'
  //       },
  //        {
  //         date: '02 Nov 2024 03:35 PM',
  //         description: 'Invoice Added',
  //         details: 'Invoice INV-000001 emailed by Susan Daniel',
  //         currency: 'NGN',
  //         receivables: '₦500,000',
  //         paid: '₦300,000'
  //       }, {
  //         date: '02 Nov 2024 03:35 PM',
  //         description: 'Invoice Added',
  //         details: 'Invoice INV-000001 emailed by Susan Daniel',
  //         currency: 'NGN',
  //         receivables: '₦500,000',
  //         paid: '₦300,000'
  //       },
  //     ],
  //   },
  //     {
  //     name: 'Jules Book Launch',
  //     email: 'agrotech@example.com',
  //     phone: '+2347032345678',
  //     amount: '₦2,000,000',
  //     status: 'Owing',
  //     type: 'Business',
  //     currency: 'NGN',
  //     paymentTerms: 'Net 60',
  //     transactions: [],
  //   },
  // ];



  showSuccess(message: string) {
    console.log('showSuccess')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}