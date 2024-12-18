import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-price-list',
  templateUrl: './create-price-list.component.html',
  styleUrl: './create-price-list.component.scss'
})
export class CreatePriceListComponent {

  constructor(private router: Router){}

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
    { category: '', details: '', price: '', quantity: '' }
  ];

  // Options for dropdown categories
  categories: string[] = ['Pastry', 'Seafood', 'Beef', 'Chickens', 'Grill'];

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

  
}
