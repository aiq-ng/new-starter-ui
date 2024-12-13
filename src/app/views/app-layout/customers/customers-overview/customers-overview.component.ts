import { Component } from '@angular/core';

@Component({
  selector: 'app-customers-overview',
  templateUrl: './customers-overview.component.html',
  styleUrl: './customers-overview.component.scss'
})
export class CustomersOverviewComponent {

  ngOnInit() {
    this.selectedCustomer = this.customers[0]; // Default selection
  }

  selectCustomer(customer: any) {
    this.selectedCustomer = customer;
  }

  customers = [
    {
      name: 'Mr. Maxwell',
      email: 'maxwell@example.com',
      phone: '+2348012345678',
      amount: '₦1,500,000',
      status: 'Owing',
      type: 'Individual',
      currency: 'NGN',
      paymentTerms: 'Net 30',
      transactions: [
        {
          date: '02 Nov 2024 03:35 PM',
          description: 'Invoice Added',
          details: 'Invoice INV-000001 emailed by Susan Daniel',
          currency: 'NGN',
          receivables: '₦500,000',
          paid: '₦300,000'
        },
        {
          date: '31 Nov 2024 03:35 PM',
          description: 'Invoice Added',
          details: 'Invoice INV-000001 emailed by Susan Daniel',
          currency: 'NGN',
          receivables: '₦400,000',
          paid: '₦200,000'
        },
      ],
    },
    {
      name: 'Agro Tech',
      email: 'agrotech@example.com',
      phone: '+2347032345678',
      amount: '₦2,000,000',
      status: 'Paid',
      type: 'Business',
      currency: 'NGN',
      paymentTerms: 'Net 60',
      transactions: [],
    },
    {
      name: 'Maxwell Book Launch',
      email: 'agrotech@example.com',
      phone: '+2347032345678',
      amount: '₦1,500,000',
      status: 'Due in 5 days',
      type: 'Business',
      currency: 'NGN',
      paymentTerms: 'Net 60',
      transactions: [],
    },
      {
      name: 'Jules Book Launch',
      email: 'agrotech@example.com',
      phone: '+2347032345678',
      amount: '₦2,000,000',
      status: 'Owing',
      type: 'Business',
      currency: 'NGN',
      paymentTerms: 'Net 60',
      transactions: [],
    },
  ];

  selectedCustomer: any;

}