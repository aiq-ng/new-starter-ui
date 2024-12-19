import { Component } from '@angular/core';

@Component({
  selector: 'app-customers-create',
  templateUrl: './customers-create.component.html',
  styleUrl: './customers-create.component.scss'
})
export class CustomersCreateComponent {


  customerType: string = 'Business';
  activeTab: string = 'otherDetails'; 

  customerData = {
    salutation: '',
    firstName: '',
    lastName: '',
    companyName: '',
    displayName: '',
    email: '',
    workPhone: '',
    mobile: ''
  };

  
otherDetails = {
  paymentTerms: '',
  currency: '',
  websiteUrl: '',
  twitter: '',
  facebook: ''
};

delivery = {
 address: ''
};

  onCustomerTypeChange(type: string) {
    this.customerType = type;
}

switchTab(tab: string) {
  this.activeTab = tab;
}

}
