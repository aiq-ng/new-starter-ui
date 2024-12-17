import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounting-vendors',
  templateUrl: './accounting-vendors.component.html',
  styleUrl: './accounting-vendors.component.scss'
})
export class AccountingVendorsComponent {
  tableHeader = [
    "Name",
    "Category",
    "Email",
    "Work Phone",
    "Address",
    "Transaction",
    "Status"

  ]
  vendors = [
    {
      name: "John Doe",
      category: "Supplier",
      email: "john.doe@example.com",
      workPhone: "+1 234-567-8901",
      address: "123 Elm Street, Springfield, USA",
      transaction: "$5,000.00",
      status: "Active",
    },
    {
      name: "Jane Smith",
      category: "Customer",
      email: "jane.smith@example.com",
      workPhone: "+44 20 7946 0958",
      address: "45 Baker Street, London, UK",
      transaction: "$1,200.00",
      status: "Pending",
    },
    {
      name: "Michael Brown",
      category: "Vendor",
      email: "michael.brown@example.com",
      workPhone: "+61 7 3123 4567",
      address: "78 King Street, Brisbane, Australia",
      transaction: "$2,800.00",
      status: "Inactive",
    },
    {
      name: "Emma Wilson",
      category: "Partner",
      email: "emma.wilson@example.com",
      workPhone: "+91 98765 43210",
      address: "56 MG Road, Bengaluru, India",
      transaction: "$3,450.00",
      status: "Active",
    },
    {
      name: "Robert Johnson",
      category: "Investor",
      email: "robert.johnson@example.com",
      workPhone: "+81 90-1234-5678",
      address: "12 Tokyo Tower Avenue, Tokyo, Japan",
      transaction: "$9,000.00",
      status: "Pending",
    },
  ];

  constructor(private router:Router){}

  ngOnInit(){}

  route(page:any){
    this.router.navigate([page]);
  }

}
