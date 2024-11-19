import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  purchases = [
    {
      "id": 1,
      "purchaseDate": "2023-10-01",
      "supplier": "Supplier A",
      "items": [
        {
          "product": "Ingredient 1",
          "quantity": 10,
          "pricePerUnit": 5.00,
          "totalPrice": 50.00
        },
        {
          "product": "Ingredient 2",
          "quantity": 20,
          "pricePerUnit": 2.50,
          "totalPrice": 50.00
        }
      ],
      "totalCost": 100.00
    },
    {
      "id": 2,
      "purchaseDate": "2023-10-02",
      "supplier": "Supplier B",
      "items": [
        {
          "product": "Ingredient 3",
          "quantity": 5,
          "pricePerUnit": 10.00,
          "totalPrice": 50.00
        },
        {
          "product": "Ingredient 4",
          "quantity": 15,
          "pricePerUnit": 3.00,
          "totalPrice": 45.00
        }
      ],
      "totalCost": 95.00
    },
    {
      "id": 3,
      "purchaseDate": "2023-10-03",
      "supplier": "Supplier C",
      "items": [
        {
          "product": "Ingredient 5",
          "quantity": 12,
          "pricePerUnit": 4.00,
          "totalPrice": 48.00
        },
        {
          "product": "Ingredient 6",
          "quantity": 8,
          "pricePerUnit": 6.00,
          "totalPrice": 48.00
        }
      ],
      "totalCost": 96.00
    },
    {
      "id": 4,
      "purchaseDate": "2023-10-04",
      "supplier": "Supplier A",
      "items": [
        {
          "product": "Ingredient 7",
          "quantity": 25,
          "pricePerUnit": 1.00,
          "totalPrice": 25.00
        },
        {
          "product": "Ingredient 8",
          "quantity": 10,
          "pricePerUnit": 7.50,
          "totalPrice": 75.00
        }
      ],
      "totalCost": 100.00
    },
    {
      "id": 5,
      "purchaseDate": "2023-10-05",
      "supplier": "Supplier D",
      "items": [
        {
          "product": "Ingredient 9",
          "quantity": 30,
          "pricePerUnit": 0.75,
          "totalPrice": 22.50
        },
        {
          "product": "Ingredient 10",
          "quantity": 20,
          "pricePerUnit": 2.00,
          "totalPrice": 40.00
        }
      ],
      "totalCost": 62.50
    },
    {
      "id": 6,
      "purchaseDate": "2023-10-06",
      "supplier": "Supplier E",
      "items": [
        {
          "product": "Ingredient 11",
          "quantity": 6,
          "pricePerUnit": 8.00,
          "totalPrice": 48.00
        },
        {
          "product": "Ingredient 12",
          "quantity": 14,
          "pricePerUnit": 3.50,
          "totalPrice": 49.00
        }
      ],
      "totalCost": 97.00
    },
    {
      "id": 7,
      "purchaseDate": "2023-10-07",
      "supplier": "Supplier F",
      "items": [
        {
          "product": "Ingredient 13",
          "quantity": 10,
          "pricePerUnit": 2.00,
          "totalPrice": 20.00
        },
        {
          "product": "Ingredient 14",
          "quantity": 5,
          "pricePerUnit": 9.00,
          "totalPrice": 45.00
        }
      ],
      "totalCost": 65.00
    },
    {
      "id": 8,
      "purchaseDate": "2023-10-08",
      "supplier": "Supplier G",
      "items": [
        {
          "product": "Ingredient 15",
          "quantity": 20,
          "pricePerUnit": 1.25,
          "totalPrice": 25.00
        },
        {
          "product": "Ingredient 16",
          "quantity": 12,
          "pricePerUnit": 4.00,
          "totalPrice": 48.00
        }
      ],
      "totalCost": 73.00
    },
    {
      "id": 9,
      "purchaseDate": "2023-10-09",
      "supplier": "Supplier H",
      "items": [
        {
          "product": "Ingredient 17",
          "quantity": 8,
          "pricePerUnit": 5.50,
          "totalPrice": 44.00
        },
        {
          "product": "Ingredient 18",
          "quantity": 10,
          "pricePerUnit": 6.00,
          "totalPrice": 60.00
        }
      ],
      "totalCost": 104.00
    },
    {
      "id": 10,
      "purchaseDate": "2023-10-10",
      "supplier": "Supplier I",
      "items": [
        {
          "product": "Ingredient 19",
          "quantity": 15,
          "pricePerUnit": 2.00,
          "totalPrice": 30.00
        },
        {
          "product": "Ingredient 20",
          "quantity": 7,
          "pricePerUnit": 5.00,
          "totalPrice": 35.00
        }
      ],
      "totalCost": 65.00
    }
  ]

  constructor() { }

  getPurchases(){
    return this.purchases
  }

}
