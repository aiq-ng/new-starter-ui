// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { HttpServiceService } from '../../../../../services/http-service.service';
// import { MessageService } from 'primeng/api';
// @Component({
//   selector: 'app-create-sales-order',
//   templateUrl: './create-sales-order.component.html',
//   styleUrl: './create-sales-order.component.scss',
//   providers: [MessageService] 
// })
// export class CreateSalesOrderComponent {
//   @Output() saveProduct = new EventEmitter<string>(); 

//   createProductForm:any;
//   isSubmitted: boolean = false;
//   files:any;


//   constructor(private fb:FormBuilder,
//     private api:HttpServiceService,
//     private messageService: MessageService){}

//     // ngOnInit(): void {
//     //   this.createSalesOrder = this.fb.group({

//     //     orderType: ['', Validators.required],

//     //     {
//     //       "order_type": "order", // order or service
//     //       "order_title": "Office Supplies Purchase",
//     //       "customer_id": 1,
//     //       "payment_method_id": 1,
//     //       "payment_term_id": 4,
//     //       "delivery_option": "delivery", // delivery or pickup
//     //       "assigned_driver_id": 1,
//     //       "delivery_date": "2024-12-05",
//     //       "additional_note": "Ensure to be available for delivery.",
//     //       "customer_note": "Thank You For Your Business",
//     //       "discount": 5.00,
//     //       "delivery_charge": 50.00,
//     //       "total": 1050.00,
//     //       "items": [
//     //           {
//     //               "item_id": 3,
//     //               "quantity": 10,
//     //               "price": 100.00
//     //           },
//     //           {
//     //               "item_id": 4,
//     //               "quantity": 5,
//     //               "price": 50.00
//     //           }
//     //       ]
//     //   }
      
//     //   })
      
//     // }

//  // Initialize the table with one row
//  items: any[] = [
//   { customers: '', details: '', price: '', quantity: '' }
// ];

// // Options for dropdown categories
// customers: string[] = ['Mr Abimbola Lara', 'Mrs Susan Peterson', 'Jamilshon Ltd.', 'Mr Emmanuel Akinola'];
//  // Modal state
//  isModalOpen: boolean = false;
//  // New category inputs
// newCustomer = {
// name: '',
// description: ''
// };


// // Open modal
// openModal() {
// this.isModalOpen = true;
// this.newCustomer = { name: '', description: '' };
// }

// // Close modal
// closeModal() {
// this.isModalOpen = false;
// }

// // Save new category
// saveCategory() {
// if (this.newCustomer.name.trim()) {
//  this.customers.push(this.newCustomer.name);
// }
// this.closeModal();
// }

// }

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-sales-order',
  templateUrl: './create-sales-order.component.html',
  styleUrls: ['./create-sales-order.component.scss'],
  providers: [MessageService],
})
export class CreateSalesOrderComponent {
  @Output() saveProduct = new EventEmitter<string>();

  createSalesOrderForm: FormGroup;
  isSubmitted: boolean = false;
  customers: string[] = ['Mr Abimbola Lara', 'Mrs Susan Peterson', 'Jamilshon Ltd.', 'Mr Emmanuel Akinola'];
  isModalOpen: boolean = false;
  newCustomer = { name: '', description: '' };

   // Initialize the table with one row
 items: any[] = [
  { customers: '', details: '', price: '', quantity: '' }
];

  constructor(
    private fb: FormBuilder,
    private apiService: HttpServiceService,
    private messageService: MessageService
  ) {
    this.createSalesOrderForm = this.fb.group({
      order_type: ['order', Validators.required],
      order_title: ['', Validators.required],
      customer_id: ['', Validators.required],
      payment_method_id: ['', Validators.required],
      payment_term_id: ['', Validators.required],
      delivery_option: ['', Validators.required],
      assigned_driver_id: ['', Validators.required],
      delivery_date: ['', Validators.required],
      additional_note: [''],
      customer_note: [''],
      discount: [0, Validators.required],
      delivery_charge: [0, Validators.required],
      total: [0, Validators.required],
      items: this.fb.array([
        this.fb.group({
          item_id: ['', Validators.required],
          quantity: [0, Validators.required],
          price: [0, Validators.required],
        }),
      ]),
    });
  }

  // Add Customer Modal
  openModal() {
    this.isModalOpen = true;
    this.newCustomer = { name: '', description: '' };
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveCategory() {
    if (this.newCustomer.name.trim()) {
      this.customers.push(this.newCustomer.name);
      this.messageService.add({
        severity: 'success',
        summary: 'Customer Added',
        detail: 'New customer added successfully.',
      });
    }
    this.closeModal();
  }

  // Submit Sales Order
  submitOrder() {
    this.isSubmitted = true;

    if (this.createSalesOrderForm.valid) {
      const formData = this.createSalesOrderForm.value;

      this.apiService.post('/sales/orders', formData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Order Created',
            detail: 'Sales order created successfully!',
          });
          this.createSalesOrderForm.reset();
          this.isSubmitted = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create sales order.',
          });
          console.error(err);
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Form',
        detail: 'Please fill all required fields.',
      });
    }
  }
}

