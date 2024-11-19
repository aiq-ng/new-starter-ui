import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]

})
export class LoginComponent {
  loginForm!: any;
  isSubmitted: boolean = false;
  loading: boolean = false;
  hidePassword: boolean = true;
  toastType!:string;
  response:any;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private storage: StorageService){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f(){return this.loginForm.controls;}

  login(){
    this.isSubmitted = true;
    this.loading = true;

    if(this.loginForm.invalid){
      this.loading = false;
      return;
    }



    this.auth.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        this.response = res;
        this.storage.savedata('jwt_token', this.response.data.token)
        this.showSuccess('login successfull!')
        this.router.navigate(['/app/dashboard']);

      },
      (err) => {
        console.error(err);
        this.showError('Invalid email or password!')
        this.loading = false;
      }
    );

  }

  viewPassword(){
    this.hidePassword =!this.hidePassword;
  }

  showSuccess(message:string) {
    console.log(message);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
