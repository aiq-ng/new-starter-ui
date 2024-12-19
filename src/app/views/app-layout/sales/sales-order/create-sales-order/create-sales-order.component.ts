

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-sales-order',
  templateUrl: './create-sales-order.component.html',
  styleUrls: ['./create-sales-order.component.scss'],
  providers: [MessageService],
})
export class CreateSalesOrderComponent {
  @Output() saveProduct = new EventEmitter<string>();
  // customer: any;
  pageLoading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;
  createSalesOrderForm: any;
  isSubmitted: boolean = false;
  // customers: string[] = ['Mr Abimbola Lara', 'Mrs Susan Peterson', 'Jamilshon Ltd.', 'Mr Emmanuel Akinola'];
  isModalOpen: boolean = false;
  newCustomer = { name: '', description: '' };



  customers: any[] = [];
   // Initialize the table with one row
 items: any[] = [
  { customers: '', details: '', price: '', quantity: '' }
];

  constructor(
    private fb: FormBuilder,
    private api: HttpServiceService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCustomers();

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

  getCustomers() {
    this.pageLoading = true;
    this.api.get('customers')
      .subscribe(
       (res:any) => {
          this.customers = res.data;
          console.log(this.customers);
          this.pageLoading = false;
       },
      )
  }

    onCustomerSelect(event: Event, item: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'Add Customer') {
      this.openModal();
    } else {
      item.customers = selectedValue;
    }
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
  route(arg0: string) {
    this.router.navigateByUrl(arg0);
    // throw new Error('Method not implemented.');
    }

    get f() {
      return this.createSalesOrderForm.controls;
    }
  
  // Submit Sales Order
  submitOrder() {
    this.isSubmitted = true;
    
    console.log(this.createSalesOrderForm.value);

    let formData:any = new FormData();
    if (this.createSalesOrderForm.valid) {
          // Append other form data
    formData.append('order_type', this.createSalesOrderForm.get('orderType')?.value);
    formData.append('customer_id', this.createSalesOrderForm.get('customerName')?.value);
    formData.append('payment_method_id', this.createSalesOrderForm.get('paymentMethod')?.value);
    formData.append('delivery_option', this.createSalesOrderForm.get('deliveryOption')?.value);
    formData.append('assigned_driver_id', this.createSalesOrderForm.get('driver')?.value);
    formData.append('delivery_date', this.createSalesOrderForm.get('deliveryDate')?.value);
    formData.append('delivery_time', this.createSalesOrderForm.get('deliveryTime')?.value);
    formData.append('additional_note', this.createSalesOrderForm.get('additionalNote')?.value);
    formData.append('discount', this.createSalesOrderForm.get('discount')?.value);
    formData.append('delivery_charge', this.createSalesOrderForm.get('deliveryCharge')?.value);
    formData.append('total', this.createSalesOrderForm.get('total')?.value);

      // const formData = this.createSalesOrderForm.value;

      this.api.post('sales/orders', formData).subscribe({
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

