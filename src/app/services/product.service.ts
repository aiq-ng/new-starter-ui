import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dummyProducts = [
    {
      "id": 1,
      "warehouseId": 1,
      "name": "Chicken",
      "amountSold": 100,
      "quantity": 120,
      "createdOn": "2023-10-15T12:34:56Z"
    },
    {
      "id": 2,
      "warehouseId": 2,
      "name": "Beef",
      "amountSold": 50,
      "quantity": 50,
      "createdOn": "2023-11-02T18:23:17Z"
    },
    {
      "id": 3,
      "warehouseId": 3,
      "name": "Catfish",
      "amountSold": 75,
      "quantity": 75,
      "createdOn": "2023-12-08T09:12:34Z"
    },
    {
      "id": 4,
      "warehouseId": 1,
      "name": "Tomatoes",
      "amountSold": 120,
      "quantity": 200,
      "createdOn": "2023-09-20T15:45:01Z"
    },
    {
      "id": 5,
      "warehouseId": 2,
      "name": "Flour",
      "amountSold": 100,
      "quantity": 150,
      "createdOn": "2023-08-12T10:30:22Z"
    },
    {
      "id": 6,
      "warehouseId": 3,
      "name": "Flour",
      "amountSold": 80,
      "quantity": 120,
      "createdOn": "2023-07-17T17:25:33Z"
    },
    {
      "id": 7,
      "warehouseId": 1,
      "name": "Yam",
      "amountSold": 110,
      "quantity": 120,
      "createdOn": "2023-06-19T13:16:44Z"
    },
    {
      "id": 8,
      "warehouseId": 2,
      "name": "Garlic",
      "amountSold": 60,
      "quantity": 60,
      "createdOn": "2023-05-22T11:07:55Z"
    }
  ]

  dummyWareHouses = [
    {
      "id": 1,
      "name": "Warehouse A",
      "address": "No 2 B Close off 11 crescent, Kado | Cold Room",
      "productCount": "80",
      "itemCount": "9000"
    },

    {
      "id": 2,
      "name": "Warehouse B",
      "address": "No 6 C Close off 11 crescent, Qwarinpa | Cold Room",
      "productCount": "30",
      "itemCount": "11,000"
    },

    {
      "id": 3,
      "name": "Warehouse C",
      "address": "No 2 H Close off 11 crescent, Garki | Cold Room",
      "productCount": "50",
      "itemCount": "31,000"
    }
  ]

  products:any;
  wareHouses:any;

  constructor(private api:HttpServiceService) { }


  getWarehouses(){
    this.api.get('warehouses').subscribe(
      res=>{
        this.wareHouses = res
        this.wareHouses = this.wareHouses.data
      },
      err=>{
        console.log(err)
      }
    )
  }

  getProducts(){
    this.api.get('products').subscribe(
      res =>{
        this.products = res
        this.products = this.products.data
      },
      err=>{
        console.log(err)
      }
    )
  }

  getAvailableProducts(){
    return this.dummyProducts.filter((product:any)=>{
      return product.quantity - product.amountSold === 0;
    })
  }

  getUnavailableProducts(){
    return this.dummyProducts.filter((product:any)=>{
      return product.quantity - product.amountSold === 0;
    })
  }

  getWareHouses(){
    return this.wareHouses
  }

  getWareHouse(id:number){
    let wareHouse = this.dummyWareHouses.filter((wareHouse:any)=>{
      return wareHouse.id === id;
    })

    return wareHouse;
  }
}
