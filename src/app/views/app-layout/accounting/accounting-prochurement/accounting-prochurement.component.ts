import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounting-prochurement',
  templateUrl: './accounting-prochurement.component.html',
  styleUrl: './accounting-prochurement.component.scss'
})
export class AccountingProchurementComponent {
  procurementData:any=[];
  pageLoading:boolean = false;
  tabMenu:any = ['Expenses', 'Bill']
  tableHeader:any = ['expense Id', 'date', 'paid through', 'customer name', 'expense type', 'Amount']

  constructor(private router:Router){}

  ngOnInit() {
    this.procurementData = [
      {
        "expenseId": "EXP-001",
        "date": "2024-12-10",
        "paidThrough": "Bank Transfer",
        "customerName": "John Doe",
        "expenseType": "Office Supplies",
        "Amount": 25000
      },
      {
        "expenseId": "EXP-002",
        "date": "2024-12-12",
        "paidThrough": "Cash",
        "customerName": "Jane Smith",
        "expenseType": "Travel",
        "Amount": 15000
      },
      {
        "expenseId": "EXP-003",
        "date": "2024-12-14",
        "paidThrough": "Credit Card",
        "customerName": "Mark Lee",
        "expenseType": "Utilities",
        "Amount": 5000
      },
      {
        "expenseId": "EXP-004",
        "date": "2024-12-15",
        "paidThrough": "Mobile Payment",
        "customerName": "Sarah Johnson",
        "expenseType": "Advertising",
        "Amount": 40000
      },
      {
        "expenseId": "EXP-005",
        "date": "2024-12-16",
        "paidThrough": "Bank Transfer",
        "customerName": "David Brown",
        "expenseType": "Repairs",
        "Amount": 12000
      }
    ]
  }

  route(page:string){
    this.router.navigate([page]);
  }

}
