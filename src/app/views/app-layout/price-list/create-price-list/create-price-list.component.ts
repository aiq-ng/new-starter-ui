import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-price-list',
  templateUrl: './create-price-list.component.html',
  styleUrl: './create-price-list.component.scss'
})
export class CreatePriceListComponent {

  createPriceListForm: any;
  constructor(
    private fb:FormBuilder,
    private api:HttpServiceService,
    private messageService: MessageService,
    private router: Router){}


    ngOnInit(){
        this.createPriceListForm = this.fb.group({

        })
    }

  route(arg0: string) {
    this.router.navigateByUrl(arg0);
    // throw new Error('Method not implemented.');
    }


  priceList: any[] = []; // Holds items in the price list
  itemName: string = '';
  itemPrice: number = 0;
  itemQuantity: string = '';

  @Output() onSave = new EventEmitter<any[]>(); // Event emitter for save

  // Add new item to the price list
  addItem() {
    if (this.itemName && this.itemPrice && this.itemQuantity) {
      this.priceList.push({
        name: this.itemName,
        price: this.itemPrice,
        quantity: this.itemQuantity,
      });
      this.resetInputs();
    }
  }

     // Save the price list
  savePriceList() {
    this.onSave.emit(this.priceList); // Emit the saved price list to parent
  }

  // Reset input fields
  resetInputs() {
    this.itemName = '';
    this.itemPrice = 0;
    this.itemQuantity = '';
  }

  //Table Headers
  tableHeader = ['ITEM CATEGORY', 'ITEM DETAILS', 'UNIT PRICE(#)', 'MINIMUM ORDER QTY']

  // Initialize the table with one row
  items: any[] = [
    { item_category_id: '', item_details: '', unit_price: '', minimum_order: '', unit_id: ''}
  ];


  // Options for dropdown categories
  categories: any[] = [{id: 1, name: 'Pastry'}, {id: 2, name: 'Seafood'}, {id: 3, name: 'Beef'}, {id: 4, name: 'Chicken'}, {id: 5, name: 'Grill'}];

  // Add a new row
  addRow() {
    this.items.push({ category: '', details: '', price: '', quantity: '' });
  }

  // Remove a row
  removeRow(index: number) {
    this.items.splice(index, 1);
  }



    // Modal state
    isModalOpen: boolean = false;
      // New category inputs
    newCategory = {
    name: '',
    description: ''
  };


  // Open modal
  openModal() {
    this.isModalOpen = true;
    this.newCategory = { name: '', description: '' };
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Save new category
  saveCategory() {
    if (this.newCategory.name.trim()) {
      this.categories.push(this.newCategory.name);
    }
    this.closeModal();
  }

  onSubmit() {
    console.log('Form Data:', this.items);

    // Post the form data to the API
    this.api.post('sales/price-list', this.items).subscribe({
      next: (response) => {
        console.log('Success:', response);
        alert('Price List added successfully!');
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Failed to add price list.');
      }
    });
  }
  
}
