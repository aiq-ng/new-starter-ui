import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient, private storage: StorageService) { }


  signup(data:any){
    return this.http.post(this.baseUrl + 'auth/register', data).pipe(
      retry(3)
    )
  }

  login(data:any){
    return this.http.post(this.baseUrl + 'auth/login', data).pipe(
      retry(3)
    )
  }

  logout(){
    return this.http.get(this.baseUrl + 'auth/logout').pipe(
      retry(3)
    )
  }

  getJwtToken(){
    return this.storage.getdata('jwt_token')
  }


}
