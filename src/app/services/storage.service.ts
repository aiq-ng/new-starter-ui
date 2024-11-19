import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  savedata(name: string, value: string){
    localStorage.setItem(name, value);
  }

  getdata(name: string){
    return localStorage.getItem(name);
  }

  saveJson(name:string, data: object){
    localStorage.setItem(name, JSON.stringify(data))
  }

  getJson(name:string){
    let data = localStorage.getItem(name)
    return data ? JSON.parse(data) : null;
  }

  removeData(name:string){
    localStorage.removeItem(name);
  }

  clearStorage(){
    localStorage.clear();
  }


}
