import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  salesData = [
    {
      "date": "2023-10-11",
      "sales": 100,
      "revenue": 5000,
      "profit": 2000,
      "expenses": 3000,
      "customers": 50,
      "topSellers": ["Product A", "Product B"],
      "notes": "Strong sales day due to promotion.",
      "salesDetails": [
        {
          "time": "10:30 AM",
          "product": "Product A",
          "quantity": 2,
          "saleAmount": 500
        },
        {
          "time": "2:15 PM",
          "product": "Product B",
          "quantity": 3,
          "saleAmount": 750
        },
        {
          "time": "5:45 PM",
          "product": "Product A",
          "quantity": 1,
          "saleAmount": 250
        }
      ]
    },
    {
      "date": "2023-10-10",
      "sales": 80,
      "revenue": 4000,
      "profit": 1500,
      "expenses": 2500,
      "customers": 40,
      "topSellers": ["Product C", "Product D"],
      "notes": "Slower sales day, but good profit margin.",
      "salesDetails": [
        {
          "time": "9:20 AM",
          "product": "Product C",
          "quantity": 2,
          "saleAmount": 400
        },
        {
          "time": "1:50 PM",
          "product": "Product D",
          "quantity": 1,
          "saleAmount": 250
        },
        {
          "time": "4:10 PM",
          "product": "Product C",
          "quantity": 3,
          "saleAmount": 600
        }
      ]
    },
    {
      "date": "2023-10-09",
      "sales": 90,
      "revenue": 4500,
      "profit": 1800,
      "expenses": 2700,
      "customers": 45,
      "topSellers": ["Product E", "Product F"],
      "notes": "Steady sales day with average profit.",
      "salesDetails": [
        {
          "time": "11:05 AM",
          "product": "Product E",
          "quantity": 4,
          "saleAmount": 800
        },
        {
          "time": "12:40 PM",
          "product": "Product F",
          "quantity": 2,
          "saleAmount": 600
        },
        {
          "time": "3:30 PM",
          "product": "Product E",
          "quantity": 1,
          "saleAmount": 200
        }
      ]
    },
    {
      "date": "2023-10-08",
      "sales": 120,
      "revenue": 6000,
      "profit": 2400,
      "expenses": 3600,
      "customers": 60,
      "topSellers": ["Product G", "Product H"],
      "notes": "Excellent sales day due to holiday.",
      "salesDetails": [
        {
          "time": "9:00 AM",
          "product": "Product G",
          "quantity": 3,
          "saleAmount": 900
        },
        {
          "time": "12:15 PM",
          "product": "Product H",
          "quantity": 4,
          "saleAmount": 1000
        },
        {
          "time": "5:30 PM",
          "product": "Product G",
          "quantity": 2,
          "saleAmount": 600
        }
      ]
    },
    {
      "date": "2023-10-07",
      "sales": 70,
      "revenue": 3500,
      "profit": 1200,
      "expenses": 2300,
      "customers": 35,
      "topSellers": ["Product I", "Product J"],
      "notes": "Below average sales day.",
      "salesDetails": [
        {
          "time": "10:50 AM",
          "product": "Product I",
          "quantity": 1,
          "saleAmount": 200
        },
        {
          "time": "2:00 PM",
          "product": "Product J",
          "quantity": 2,
          "saleAmount": 400
        },
        {
          "time": "6:00 PM",
          "product": "Product I",
          "quantity": 1,
          "saleAmount": 150
        }
      ]
    },
    {
      "date": "2023-10-06",
      "sales": 110,
      "revenue": 5500,
      "profit": 2200,
      "expenses": 3300,
      "customers": 55,
      "topSellers": ["Product K", "Product L"],
      "notes": "Good sales day with above average profit.",
      "salesDetails": [
        {
          "time": "9:30 AM",
          "product": "Product K",
          "quantity": 2,
          "saleAmount": 500
        },
        {
          "time": "1:20 PM",
          "product": "Product L",
          "quantity": 3,
          "saleAmount": 750
        },
        {
          "time": "4:40 PM",
          "product": "Product K",
          "quantity": 1,
          "saleAmount": 250
        }
      ]
    },
    {
      "date": "2023-10-05",
      "sales": 95,
      "revenue": 4750,
      "profit": 1900,
      "expenses": 2850,
      "customers": 48,
      "topSellers": ["Product M", "Product N"],
      "notes": "Average sales day with typical profit margin.",
      "salesDetails": [
        {
          "time": "10:10 AM",
          "product": "Product M",
          "quantity": 3,
          "saleAmount": 600
        },
        {
          "time": "12:50 PM",
          "product": "Product N",
          "quantity": 2,
          "saleAmount": 500
        },
        {
          "time": "4:30 PM",
          "product": "Product M",
          "quantity": 1,
          "saleAmount": 200
        }
      ]
    },
    {
      "date": "2023-10-04",
      "sales": 105,
      "revenue": 5250,
      "profit": 2100,
      "expenses": 3150,
      "customers": 53,
      "topSellers": ["Product O", "Product P"],
      "notes": "Slightly above average sales day.",
      "salesDetails": [
        {
          "time": "9:15 AM",
          "product": "Product O",
          "quantity": 2,
          "saleAmount": 500
        },
        {
          "time": "2:45 PM",
          "product": "Product P",
          "quantity": 3,
          "saleAmount": 750
        },
        {
          "time": "5:10 PM",
          "product": "Product O",
          "quantity": 1,
          "saleAmount": 250
        }
      ]
    },
    {
      "date": "2023-10-03",
      "sales": 85,
      "revenue": 4250,
      "profit": 1700,
      "expenses": 2550,
      "customers": 43,
      "topSellers": ["Product Q", "Product R"],
      "notes": "Below average sales day with lower profit margin.",
      "salesDetails": [
        {
          "time": "8:50 AM",
          "product": "Product Q",
          "quantity": 2,
          "saleAmount": 400
        },
        {
          "time": "12:20 PM",
          "product": "Product R",
          "quantity": 1,
          "saleAmount": 250
        },
        {
          "time": "3:55 PM",
          "product": "Product Q",
          "quantity": 3,
          "saleAmount": 600
        }
      ]
    }
  ]

  constructor() { }

  getSalesData(){
    return this.salesData;
  }
}
