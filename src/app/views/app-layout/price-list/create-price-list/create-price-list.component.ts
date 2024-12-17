import { Component } from '@angular/core';

@Component({
  selector: 'app-create-price-list',
  templateUrl: './create-price-list.component.html',
  styleUrl: './create-price-list.component.scss'
})
export class CreatePriceListComponent {


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
