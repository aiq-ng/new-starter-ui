import { Component } from '@angular/core';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customers-create',
  templateUrl: './customers-create.component.html',
  styleUrl: './customers-create.component.scss'
})
export class CustomersCreateComponent {
  constructor(
    private api:HttpServiceService,
    private router: Router,
 ){}

 route(arg0: string) {
  this.router.navigateByUrl(arg0);
  // throw new Error('Method not implemented.');
  }

  customerType: string = 'Business';
  activeTab: string = 'otherDetails'; 

  customerData = {
    customer_type: '',
    salutation: '',
    first_name: '',
    last_name: '',
    company_name: '',
    display_name: '',
    email: '',
    work_phone: '',
    mobile_phone: '',
    payment_terms_id: '',
    currency_id: '',
    address: '',
    website: '',
    social_media: {
      facebook: '',
      twitter: ''
  }
     
  };

  currency = [
    { id: 1, name: 'USD',},
    { id: 2, name: 'EUR',},
    { id: 3, name: 'NAR',},
  ];
  payment_terms = [
    { id: 1, name: 'USD',},
    { id: 2, name: 'EUR',},
    { id: 3, name: 'NAR',},
  ];


  
otherDetails = {
 
};

delivery = {

};

onSubmit() {
  console.log('Form Data:', this.customerData);

  // Post the form data to the API
  this.api.post('customers', this.customerData).subscribe({
    next: (response) => {
      console.log('Success:', response);
      alert('Customer added successfully!');
    },
    error: (error) => {
      console.error('Error:', error);
      alert('Failed to add customer.');
    }
  });
}

  onCustomerTypeChange(type: string) {
    this.customerType = type;
}

switchTab(tab: string) {
  this.activeTab = tab;
}

}
